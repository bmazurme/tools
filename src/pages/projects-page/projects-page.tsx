import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Button,
  Icon,
  Pagination,
  Text,
  type PaginationProps,
  type TableActionConfig,
  type TableDataItem,
} from '@gravity-ui/uikit';
import { Pencil, Plus, TrashBin } from '@gravity-ui/icons';

import ConfirmModal from '../../components/confirm-modal/confirm-modal';
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
  const [state, setState] = useState({ page: Number(searchParams.get('page')) || 1, pageSize: 10 });
  const [getProjects] = useGetProjectsByPageMutation();
  const [removeProject] = useRemoveProjectMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingProjectId, setPendingProjectId] = useState<number | null>(null);

  const fetchData = async (page: number) => {
    await getProjects(page);
  };

  const openDeleteModal = (documentId: number) => {
    setPendingProjectId(documentId);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (pendingProjectId) {
      await removeProject(pendingProjectId);
      setIsModalOpen(false);
      setPendingProjectId(null);
      fetchData(state.page);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setPendingProjectId(null);
  };

  // eslint-disable-next-line max-len, @typescript-eslint/no-unused-vars
  const getRowActions = (item: TableDataItem, _index: number): TableActionConfig<TableDataItem>[] => [
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
    fetchData(+state.page);
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
