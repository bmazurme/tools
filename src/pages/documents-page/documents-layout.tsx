import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  Button, Card, Icon, Label, Pagination, Text, withTableActions,
  type PaginationProps, Table, type TableActionConfig, type TableDataItem,
} from '@gravity-ui/uikit';
import {
  EllipsisVertical, FileText, Plus, TrashBin,
} from '@gravity-ui/icons';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  documentsSelector, documentsTotalSelector, projectSelector, setDocuments, setProject,
  useGetDocumentsByPageMutation, useGetProjectMutation, useRemoveDocumentMutation,
} from '../../store';
import ConfirmModal from '../../components/confirm-modal/confirm-modal';
import useAppToaster from '../../hooks/use-app-toaster';
import LayoutWrapper from '../../components/layout-wrapper/layout-wrapper';

import style from './documents.module.css';

function formatDate(iso?: string) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('ru-RU', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  });
}

const MyTable = withTableActions(Table);

type LabelTheme = 'normal' | 'info' | 'success' | 'warning' | 'danger' | 'unknown';

const TYPE_THEME_MAP: Record<string, LabelTheme> = {
  теплотехника: 'warning',
  водоотведение: 'info',
  гидравлика: 'success',
  водоснабжение: 'info',
};

const columns = [
  {
    id: 'name',
    name: 'Название документа',
    width: '50%',
    template: (item: TableDataItem) => (
      <span className={style.nameCell}>
        <Icon data={FileText} size={18} className={style.nameCellIcon} />
        <span className={style.nameCellText}>
          <Text variant="body-2">{item.name}</Text>
          <Text variant="caption-2" color="hint" className={style.mono}>{`DOC-${item.id}`}</Text>
        </span>
      </span>
    ),
  },
  {
    id: 'type.name',
    name: 'Тип документа',
    width: '35%',
    template: (item: TableDataItem) => {
      const typeName = item.type?.name as string | undefined;
      const theme = typeName ? (TYPE_THEME_MAP[typeName.toLowerCase()] ?? 'normal') : 'normal';
      return <Label theme={theme}>{typeName ?? '—'}</Label>;
    },
  },
  {
    id: 'updatedAt',
    name: 'Обновлён',
    width: '15%',
    template: (item: TableDataItem) => (
      <Text variant="caption-2" color="secondary">
        {formatDate(item.updatedAt)}
      </Text>
    ),
  },
];

export default function DocumentsLayout() {
  const { showError } = useAppToaster();
  const dispatch = useAppDispatch();
  const { projectId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const documents = useAppSelector(documentsSelector);
  const total = useAppSelector(documentsTotalSelector);
  const project = useAppSelector(projectSelector);
  const navigate = useNavigate();
  const [state, setState] = useState({ page: Number(searchParams.get('page')) || 1, pageSize: 10 });
  const [getDocuments, { isLoading }] = useGetDocumentsByPageMutation();
  const [getProject] = useGetProjectMutation();
  const [removeDocument] = useRemoveDocumentMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingDocumentId, setPendingDocumentId] = useState<number | null>(null);

  const openDeleteModal = useCallback((documentId: number) => {
    setPendingDocumentId(documentId);
    setIsModalOpen(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (pendingDocumentId) {
      await removeDocument(pendingDocumentId);
      setIsModalOpen(false);
      setPendingDocumentId(null);
      // fetchData(state.page);
    }
  }, [pendingDocumentId, removeDocument]);

  const cancelDelete = useCallback(() => {
    setIsModalOpen(false);
    setPendingDocumentId(null);
  }, []);

  const getRowActions = useCallback((
    item: TableDataItem,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _index: number,
  ): TableActionConfig<TableDataItem>[] => [
    {
      text: 'Удалить',
      handler: () => openDeleteModal(item.id),
      theme: 'danger',
      icon: <Icon data={TrashBin} size={18} />,
    },
  ], [openDeleteModal]);

  const handleChange = useCallback((name: string, value: string) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      [name]: value,
    });
  }, [searchParams, setSearchParams]);

  const handleUpdate: PaginationProps['onUpdate'] = useCallback(
    (page, pageSize) => setState((prevState) => ({ ...prevState, page, pageSize })),
    [],
  );
  const handleRowClick = useCallback(
    (rowData: TableDataItem) => navigate(`document/${rowData.id}/${rowData.type.link}`),
    [navigate],
  );
  const onAddDocumentClick = useCallback(() => navigate('add'), [navigate]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        handleChange('page', `${state.page}`);
        const data = await getDocuments({ id: +state.page, project: Number(projectId) }).unwrap();

        if (!isMounted) return;

        dispatch(setDocuments(data));
      } catch (error) {
        // dispatch(setError({ error: error.message }));
        showError(error, 'Ошибка при загрузке документов');
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [getDocuments, dispatch, state.page]);

  useEffect(() => {
    if (!projectId) return;

    const fetchProject = async () => {
      try {
        const data = await getProject(Number(projectId)).unwrap();
        dispatch(setProject({ project: data }));
      } catch (error) {
        showError(error, 'Ошибка при загрузке проекта');
      }
    };

    fetchProject();
  }, [getProject, dispatch, projectId]);

  return (
    <LayoutWrapper isLoading={isLoading}>
      <div className="content">
        <div className={style.titleRow}>
          <Text variant="header-1">Документы</Text>
          <Button
            view="action"
            size="m"
            onClick={onAddDocumentClick}
          >
            <Icon data={Plus} size={18} />
            Добавить документ
          </Button>
        </div>
        <Text variant="body-2" color="secondary">
          {project?.name ?? '—'}
        </Text>

        <Card view="outlined" className={style.tableCard}>
          <MyTable
            className="table"
            width="max"
            data={documents}
            columns={columns}
            getRowActions={getRowActions}
            onRowClick={handleRowClick}
            rowActionsIcon={<Icon data={EllipsisVertical} size={16} />}
          />
        </Card>

        {total > state.pageSize && (
          <Pagination
            page={state.page}
            pageSize={state.pageSize}
            total={total}
            onUpdate={handleUpdate}
          />
        )}
        {isModalOpen && (
          <ConfirmModal
            open={isModalOpen}
            setOpen={cancelDelete}
            onDelete={confirmDelete}
            title="Вы действительно хотите удалить строку?"
          />
        )}
      </div>
    </LayoutWrapper>
  );
}
