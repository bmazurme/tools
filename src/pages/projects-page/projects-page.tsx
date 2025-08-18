import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Icon,
  Pagination,
  type PaginationProps,
  Table,
  Text,
  type TableActionConfig,
  type TableDataItem,
  withTableActions,
} from '@gravity-ui/uikit';
import { Plus, TrashBin } from '@gravity-ui/icons';

import Content from '../../components/content/content';

import { useAppSelector } from '../../hooks';
import { projectsSelector } from '../../store';

import style from './projects-page.module.css';

const MyTable = withTableActions(Table);

const columns = [
  { id: 'id', name: '#', width: 60 },
  { id: 'name', name: 'Название проекта', width: '100%' },
];

export default function ProjectsPage() {
  const navigate = useNavigate();
  const { projectPage } = useParams();
  const projects = useAppSelector(projectsSelector);
  const [state, setState] = React.useState({ page: 1, pageSize: 100 });

  // eslint-disable-next-line max-len, @typescript-eslint/no-unused-vars
  const getRowActions = (_item: TableDataItem, _index: number): TableActionConfig<TableDataItem>[] => [
    // {
    //   text: 'Редактировать',
    //   handler: () => navigate(`/project/${item.id}`),
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
  const handleRowClick = (rowData: TableDataItem) => navigate(`/project/${rowData.id}`);

  return (
    <Content sidebar>
      <div className="content">
        <Text variant="header-1">Проекты</Text>
        <Button view="action" size="m" onClick={() => navigate('add')}>
          <Icon data={Plus} size={18} />
          Добавить проект
        </Button>

        <div className={style.main}>
          <MyTable
            className="table"
            data={projects}
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

      </div>
    </Content>
  );
}
