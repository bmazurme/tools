import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Icon, Pagination, type PaginationProps, Table, type TableActionConfig, type TableDataItem, withTableActions } from '@gravity-ui/uikit';
import { Pencil, Plus, TrashBin } from '@gravity-ui/icons';

import Content from '../../components/content/content';

import { menuProjects } from '../../mock';

import style from './projects-page.module.css';

const MyTable = withTableActions(Table);
const data = [
  { id: 1, text: 'Hello' },
  { id: 2, text: 'World' },
];
const columns = [{ id: 'id' }, { id: 'text' }];

const getRowActions = (_item: TableDataItem, _index: number): TableActionConfig<TableDataItem>[] => {
  return [
    {
      text: 'Редактировать',
      handler: () => {},
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

export default function ProjectsPage() {
  const navigate = useNavigate();
  const { pageId } = useParams();
  const [state, setState] = React.useState({ page: 1, pageSize: 100 });

  const handleUpdate: PaginationProps['onUpdate'] = (page, pageSize) =>
    setState((prevState) => ({ ...prevState, page, pageSize }));

  return (
    <Content menu={menuProjects} sidebar>
      <div className="content">
        {/* <Outlet /> */}
        <div className={style.menu}>
          {menuProjects.map(({ link, name }) => <Link key={uuidv4()} to={link}>{name}</Link>)}
        </div>

        <Button view="action" size="l" onClick={() => navigate('add')}>
          <Icon data={Plus} size={18} />
            Добавить проект
        </Button>

        <MyTable data={data} columns={columns} getRowActions={getRowActions} />

        {state.page} - {state.pageSize} - {pageId}
        <Pagination page={1} pageSize={100} total={1000} onUpdate={handleUpdate} />
      </div>
    </Content>
  );
}
