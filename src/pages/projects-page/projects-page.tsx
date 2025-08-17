import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Icon, Pagination, type PaginationProps, Table, type TableActionConfig, type TableDataItem, withTableActions } from '@gravity-ui/uikit';
import { Pencil, Plus, TrashBin } from '@gravity-ui/icons';

import Content from '../../components/content/content';

import style from './projects-page.module.css';

const MyTable = withTableActions(Table);
const data = [
  { id: 1, text: 'Проект 1', },
  { id: 2, text: 'Проект 2', },
  { id: 3, text: 'Проект 3', },
];
const columns = [
  { id: 'id', name: '#', width: 60 },
  { id: 'text', name: 'Название проекта', width: 260 },
];

export default function ProjectsPage() {
  const navigate = useNavigate();
  const { projectPage } = useParams();
  const [state, setState] = React.useState({ page: 1, pageSize: 100 });

  const getRowActions = (item: TableDataItem, _index: number): TableActionConfig<TableDataItem>[] => {
    return [
      {
        text: 'Редактировать',
        handler: () => navigate(`/project/${item.id}`),
        theme: 'normal',
        icon: <Icon data={Pencil} size={18} />,
      },
      {
        text: 'Удалить',
        handler: () => {},
        theme: 'danger',
        icon: <Icon data={TrashBin} size={18} />,
      },
    ];
  };

  const handleUpdate: PaginationProps['onUpdate'] = (page, pageSize) =>
    setState((prevState) => ({ ...prevState, page, pageSize }));

  return (
    <Content menu={[]} sidebar>
      <div className="content">
        <Button view="action" size="m" onClick={() => navigate('add')}>
          <Icon data={Plus} size={18} />
          Добавить проект
        </Button>

        <div className={style.main}>
          <MyTable data={data} columns={columns} getRowActions={getRowActions} />

          {state.page} - {state.pageSize} - {projectPage}
          <Pagination page={1} pageSize={100} total={1000} onUpdate={handleUpdate} />
        </div>

      </div>
    </Content>
  );
}
