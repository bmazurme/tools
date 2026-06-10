import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Button,
  Icon,
  Label,
  Pagination,
  Table,
  Text,
  withTableActions,
  type PaginationProps,
  type TableActionConfig,
  type TableDataItem,
} from '@gravity-ui/uikit';
import {
  EllipsisVertical, FolderOpen, Pencil, Plus, TrashBin,
} from '@gravity-ui/icons';

import ConfirmModal from '../../components/confirm-modal/confirm-modal';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  projectsSelector, projectsTotalSelector, setProjects, useRemoveProjectMutation,
} from '../../store';
import { useGetProjectsByPageMutation } from '../../store/api';

import useAppToaster from '../../hooks/use-app-toaster';
import LayoutWrapper from '../../components/layout-wrapper/layout-wrapper';

import style from './projects.module.css';

function getProjectsLabel(n: number) {
  if (n === 1) return 'проект';
  if (n >= 2 && n <= 4) return 'проекта';
  return 'проектов';
}

function formatDate(iso?: string) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('ru-RU', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  });
}

type StatusTheme = 'normal' | 'info' | 'success' | 'warning' | 'danger' | 'unknown';

const STATUS_THEME_MAP: Record<string, StatusTheme> = {
  активный: 'success',
  архив: 'unknown',
  черновик: 'warning',
};

const columns = [
  {
    id: 'name',
    name: 'Название проекта',
    width: '25%',
    template: (item: TableDataItem) => (
      <span className={style.nameCell}>
        <Icon data={FolderOpen} size={18} className={style.nameCellIcon} />
        <span className={style.nameCellText}>
          <Text variant="body-2">{item.name}</Text>
          {item.code && (
            <Text variant="caption-2" color="secondary">{item.code}</Text>
          )}
        </span>
      </span>
    ),
  },
  {
    id: 'documents',
    name: 'Документы',
    width: '25%',
    template: (item: TableDataItem) => (
      <Text variant="body-2" color="secondary">
        {item.documents ?? '—'}
      </Text>
    ),
  },
  {
    id: 'status',
    name: 'Статус',
    width: '25%',
    template: (item: TableDataItem) => {
      const status = item.status as ProjectStatus | null | undefined;

      if (!status) return <Text variant="body-2" color="secondary">—</Text>;

      const theme = STATUS_THEME_MAP[status.name.toLowerCase()] ?? 'normal';
      return <Label theme={theme}>{status.name}</Label>;
    },
  },
  {
    id: 'updatedAt',
    name: 'Обновлён',
    width: '25%',
    template: (item: TableDataItem) => (
      <Text variant="caption-2" color="secondary">
        {formatDate(item.updatedAt)}
      </Text>
    ),
  },
];
const MyTable = withTableActions(Table);

export default function ProjectsPage() {
  const { showError } = useAppToaster();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const projects = useAppSelector(projectsSelector);
  const total = useAppSelector(projectsTotalSelector);
  const [state, setState] = useState({ page: Number(searchParams.get('page')) || 1, pageSize: 10 });
  const [getProjects, { isLoading }] = useGetProjectsByPageMutation();
  const [removeProject] = useRemoveProjectMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingProjectId, setPendingProjectId] = useState<number | null>(null);

  const openDeleteModal = useCallback((documentId: number) => {
    setPendingProjectId(documentId);
    setIsModalOpen(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (pendingProjectId) {
      await removeProject(pendingProjectId);
      setIsModalOpen(false);
      setPendingProjectId(null);
      // getProjects(state.page);
    }
  }, [pendingProjectId, removeProject]);

  const cancelDelete = useCallback(() => {
    setIsModalOpen(false);
    setPendingProjectId(null);
  }, []);

  const getRowActions = useCallback((
    item: TableDataItem,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _index: number,
  ): TableActionConfig<TableDataItem>[] => [
    {
      text: 'Редактировать проект',
      handler: () => { navigate(`/project/${item.id}/edit`); },
      theme: 'normal',
      icon: <Icon data={Pencil} size={18} />,
    },
    {
      text: 'Удалить проект',
      handler: () => openDeleteModal(item.id),
      theme: 'danger',
      icon: <Icon data={TrashBin} size={18} />,
    },
  ], [navigate, openDeleteModal]);

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
    (rowData: TableDataItem) => navigate(`/project/${rowData.id}`),
    [navigate],
  );
  const onAddProjectClick = useCallback(() => navigate('add'), [navigate]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        handleChange('page', `${state.page}`);
        const data = await getProjects(+state.page).unwrap();

        if (!isMounted) return;

        dispatch(setProjects(data));
      } catch (error) {
        // dispatch(setError({ error: error.message }));
        showError(`${error}`, 'Ошибка при загрузке проектов');
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [getProjects, dispatch, state.page]);

  return (
    <LayoutWrapper isLoading={isLoading}>
      <div className="content">
        <div className={style.titleRow}>
          <div className={style.titleGroup}>
            <Text variant="header-1">Проекты</Text>
          </div>
          <Button
            view="action"
            size="m"
            onClick={onAddProjectClick}
          >
            <Icon data={Plus} size={18} />
            Добавить проект
          </Button>
        </div>
        <Text variant="body-2" color="secondary">
          {`${projects.length} ${getProjectsLabel(projects.length)}`}
        </Text>

        <MyTable
          className="table"
          data={projects}
          columns={columns}
          getRowActions={getRowActions}
          onRowClick={handleRowClick}
          rowActionsIcon={<Icon data={EllipsisVertical} size={16} />}
        />

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
