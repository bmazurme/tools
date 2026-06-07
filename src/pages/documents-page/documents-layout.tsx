import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  Button, Icon, Pagination, Text, withTableActions,
  type PaginationProps, Table, type TableActionConfig, type TableDataItem,
} from '@gravity-ui/uikit';
import { Plus, TrashBin } from '@gravity-ui/icons';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  documentsSelector, documentsTotalSelector, setDocuments, useGetDocumentsByPageMutation,
  useRemoveDocumentMutation,
} from '../../store';
import ConfirmModal from '../../components/confirm-modal/confirm-modal';
import useAppToaster from '../../hooks/use-app-toaster';
import LayoutWrapper from '../../components/layout-wrapper/layout-wrapper';

const MyTable = withTableActions(Table);
const columns = [
  { id: 'name', name: 'Название документа', width: '100%' },
  { id: 'type.name', name: 'Тип документа' },
  { id: 'type.description', name: 'Описание' },
  // { id: 'id', name: 'id' },
];

export default function DocumentsLayout() {
  const { showError } = useAppToaster();
  const dispatch = useAppDispatch();
  const { projectId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const documents = useAppSelector(documentsSelector);
  const total = useAppSelector(documentsTotalSelector);
  const navigate = useNavigate();
  const [state, setState] = useState({ page: Number(searchParams.get('page')) || 1, pageSize: 10 });
  const [getDocuments, { isLoading }] = useGetDocumentsByPageMutation();
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
        showError(`${error}`, 'Ошибка при загрузке документов');
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [getDocuments, dispatch, state.page]);

  return (
    <LayoutWrapper isLoading={isLoading}>
      <div className="content">
        <Text variant="header-1">Документы</Text>
        <Button
          view="action"
          size="m"
          onClick={onAddDocumentClick}
        >
          <Icon data={Plus} size={18} />
          Добавить документ
        </Button>

        <MyTable
          className="table"
          data={documents}
          columns={columns}
          getRowActions={getRowActions}
          onRowClick={handleRowClick}
        />

        <Pagination
          page={state.page}
          pageSize={state.pageSize}
          total={total}
          onUpdate={handleUpdate}
        />
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
