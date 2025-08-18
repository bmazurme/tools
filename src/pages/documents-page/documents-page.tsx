import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button, Icon, Pagination,
  type PaginationProps, Table, type TableActionConfig, type TableDataItem,
  Text, withTableActions,
} from '@gravity-ui/uikit';
import {
  ArrowLeft, Plus, TrashBin,
} from '@gravity-ui/icons';

import Content from '../../components/content/content';
import { useAppSelector } from '../../hooks';
import { documentsSelector } from '../../store';

const MyTable = withTableActions(Table);
const columns = [
  { id: 'id', name: '#', width: 60 },
  { id: 'name', name: 'Название документа', width: '100%' },
  { id: 'type.name', name: 'Тип документа', width: 160 },
];

export default function DocumentsPage() {
  const documents = useAppSelector(documentsSelector);
  const navigate = useNavigate();
  const { projectPage } = useParams();
  const [state, setState] = React.useState({ page: 1, pageSize: 100 });

  // eslint-disable-next-line max-len, @typescript-eslint/no-unused-vars
  const getRowActions = (item: TableDataItem, _index: number): TableActionConfig<TableDataItem>[] => [
    // {
    //   text: 'Редактировать',
    //   handler: () => navigate(`document/${item.id}/${item.type.link}`),
    //   theme: 'normal',
    //   icon: <Icon data={Pencil} size={18} />,
    // },
    {
      text: 'Удалить',
      handler: () => {},
      theme: 'danger',
      icon: <Icon data={TrashBin} size={18} />,
    },
  ];

  const handleUpdate: PaginationProps['onUpdate'] = (page, pageSize) => setState((prevState) => ({ ...prevState, page, pageSize }));
  const handleRowClick = (rowData: TableDataItem) => navigate(`document/${rowData.id}/${rowData.type.link}`);

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
          data={documents}
          columns={columns}
          getRowActions={getRowActions}
          onRowClick={handleRowClick}
        />
        {state.page}
        {' '}
        -
        {state.pageSize}
        {' '}
        -
        {projectPage}
        <Pagination page={1} pageSize={100} total={1000} onUpdate={handleUpdate} />
      </div>
    </Content>
  );
}
