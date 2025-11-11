import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  Button, Icon, Pagination, Text, withTableActions,
  type PaginationProps, Table, type TableActionConfig, type TableDataItem,
} from '@gravity-ui/uikit';
import { Plus, TrashBin } from '@gravity-ui/icons';

import Content from '../../components/content/content';
import { useAppSelector } from '../../hooks';
import {
  documentsSelector, documentsTotalSelector, useGetDocumentsByPageMutation,
  useRemoveDocumentMutation,
} from '../../store';
import ConfirmModal from '../../components/confirm-modal/confirm-modal';

const MyTable = withTableActions(Table);
const columns = [
  { id: 'name', name: 'Название документа', width: '100%' },
  { id: 'type.name', name: 'Тип документа' },
  { id: 'type.description', name: 'Описание' },
  { id: 'id', name: 'id' },
];

export default function DocumentsPage() {
  const { projectId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const documents = useAppSelector(documentsSelector);
  const total = useAppSelector(documentsTotalSelector);
  const navigate = useNavigate();
  const [state, setState] = React.useState({ page: Number(searchParams.get('page')) || 1, pageSize: 10 });
  const [getDocuments] = useGetDocumentsByPageMutation();
  const [removeDocument] = useRemoveDocumentMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingDocumentId, setPendingDocumentId] = useState<number | null>(null);

  const fetchData = async (page: number) => {
    await getDocuments({ id: page, project: Number(projectId) });
  };

  const openDeleteModal = (documentId: number) => {
    setPendingDocumentId(documentId);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (pendingDocumentId) {
      await removeDocument(pendingDocumentId);
      setIsModalOpen(false);
      setPendingDocumentId(null);
      fetchData(state.page);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setPendingDocumentId(null);
  };

  // eslint-disable-next-line max-len, @typescript-eslint/no-unused-vars
  const getRowActions = (item: TableDataItem, _index: number): TableActionConfig<TableDataItem>[] => [
    {
      text: 'Удалить',
      handler: () => openDeleteModal(item.id),
      theme: 'danger',
      icon: <Icon data={TrashBin} size={18} />,
    },
  ];

  const handleChange = (name: string, value: string) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      [name]: value,
    });
  };

  const handleUpdate: PaginationProps['onUpdate'] = (page, pageSize) => setState((prevState) => ({ ...prevState, page, pageSize }));
  const handleRowClick = (rowData: TableDataItem) => navigate(`document/${rowData.id}/${rowData.type.link}`);

  useEffect(() => {
    handleChange('page', `${state.page}`);
    fetchData(+state.page);
  }, [state.page]);

  return (
    <Content sidebar>
      <div className="content">
        <Text variant="header-1">Документы</Text>
        <Button view="action" size="m" onClick={() => navigate('add')}>
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
    </Content>
  );
}

export { MyTable };
