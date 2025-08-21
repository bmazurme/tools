import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Icon,
  Pagination,
  type PaginationProps,
  Text,
  type TableActionConfig,
  type TableDataItem,
} from '@gravity-ui/uikit';
import { Pencil, Plus, TrashBin } from '@gravity-ui/icons';

import Content from '../../components/content/content';
import { MyTable } from '../documents-page/documents-page';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { projectsSelector, removeProject } from '../../store';

const columns = [
  { id: 'id', name: '#', width: 60 },
  { id: 'name', name: 'Название проекта', width: '100%' },
];

export default function ProjectsPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const projects = useAppSelector(projectsSelector);
  const [state, setState] = useState({ page: 1, pageSize: 10 });
  // eslint-disable-next-line max-len, @typescript-eslint/no-unused-vars
  const getRowActions = (item: TableDataItem, _index: number): TableActionConfig<TableDataItem>[] => [
    {
      text: 'Редактировать',
      handler: () => {},
      theme: 'normal',
      icon: <Icon data={Pencil} size={18} />,
    },
    {
      text: 'Удалить',
      handler: () => dispatch(removeProject({ id: item.id })),
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

        <MyTable
          className="table"
          data={projects.slice((state.page - 1) * 10, state.page * 10)}
          columns={columns}
          getRowActions={getRowActions}
          onRowClick={handleRowClick}
        />

        <Pagination
          page={state.page}
          pageSize={state.pageSize}
          total={projects.length}
          onUpdate={handleUpdate}
        />
      </div>
    </Content>
  );
}
