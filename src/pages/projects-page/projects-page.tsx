import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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

import { useAppSelector } from '../../hooks';
import {
  projectsSelector, projectsTotalSelector, useRemoveProjectMutation,
} from '../../store';
import { useGetProjectsByPageMutation } from '../../store/api';

const columns = [
  { id: 'name', name: 'Название проекта', width: '100%' },
  { id: 'id', name: 'id', width: 60 },
];

export default function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const projects = useAppSelector(projectsSelector);
  const total = useAppSelector(projectsTotalSelector);
  const [state, setState] = useState({ page: searchParams.get('page') ? Number(searchParams.get('page')) : 1, pageSize: 10 });
  const [getProjects] = useGetProjectsByPageMutation();
  const [removeProject] = useRemoveProjectMutation();

  const updateData = async (page: number) => {
    await getProjects(page);
  };

  // eslint-disable-next-line max-len, @typescript-eslint/no-unused-vars
  const getRowActions = (item: TableDataItem, _index: number): TableActionConfig<TableDataItem>[] => [
    {
      text: 'Редактировать',
      handler: () => { navigate(`/project/${item.id}/edit`); },
      theme: 'normal',
      icon: <Icon data={Pencil} size={18} />,
    },
    {
      text: 'Удалить',
      handler: () => removeProject(item.id),
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
  const handleRowClick = (rowData: TableDataItem) => navigate(`/project/${rowData.id}`);

  useEffect(() => {
    handleChange('page', `${state.page}`);
    updateData(+state.page);
  }, [state.page]);

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
          data={projects}
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
      </div>
    </Content>
  );
}
