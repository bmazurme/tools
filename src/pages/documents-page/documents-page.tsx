import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Icon, Pagination,
  type PaginationProps, Table, type TableActionConfig, type TableDataItem,
  Text, withTableActions,
} from '@gravity-ui/uikit';
import {
  ArrowLeft, Plus, TrashBin,
} from '@gravity-ui/icons';

import Content from '../../components/content/content';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { documentsSelector, removeDocument } from '../../store';

const MyTable = withTableActions(Table);
const columns = [
  { id: 'id', name: '#', width: 60 },
  { id: 'name', name: 'Название документа', width: '100%' },
  { id: 'type', name: 'Тип документа', width: 160 },
];

export default function DocumentsPage() {
  const dispatch = useAppDispatch();
  const documents = useAppSelector(documentsSelector);
  const navigate = useNavigate();
  const [state, setState] = React.useState({ page: 1, pageSize: 10 });
  // eslint-disable-next-line max-len, @typescript-eslint/no-unused-vars
  const getRowActions = (item: TableDataItem, _index: number): TableActionConfig<TableDataItem>[] => [
    {
      text: 'Удалить',
      handler: () => dispatch(removeDocument({ id: item.id })),
      theme: 'danger',
      icon: <Icon data={TrashBin} size={18} />,
    },
  ];

  const handleUpdate: PaginationProps['onUpdate'] = (page, pageSize) => setState((prevState) => ({ ...prevState, page, pageSize }));
  const handleRowClick = (rowData: TableDataItem) => navigate(`document/${rowData.id}/${rowData.type}`);

  return (
    <Content sidebar>
      <div className="content">
        <Button view="flat" size="m" onClick={() => navigate(-1)}>
          <Icon data={ArrowLeft} size={18} />
          Назад
        </Button>

        <Text variant="header-1">Документы</Text>
        <Button view="action" size="m" onClick={() => navigate('add')}>
          <Icon data={Plus} size={18} />
          Добавить документ
        </Button>

        <MyTable
          className="table"
          data={documents.slice((state.page - 1) * 10, state.page * 10)}
          columns={columns}
          getRowActions={getRowActions}
          onRowClick={handleRowClick}
        />

        <Pagination
          page={state.page}
          pageSize={state.pageSize}
          total={documents.length}
          onUpdate={handleUpdate}
        />
      </div>
    </Content>
  );
}

export { MyTable };
