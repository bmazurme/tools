import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Button,
  Icon,
  Pagination,
  Table,
  Text,
  withTableActions,
  type PaginationProps,
  type TableActionConfig,
  type TableDataItem,
} from '@gravity-ui/uikit';
import { Pencil, Plus, TrashBin } from '@gravity-ui/icons';

import ConfirmModal from '../../components/confirm-modal/confirm-modal';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  projectsSelector, projectsTotalSelector, setProjects, useRemoveProjectMutation,
} from '../../store';
import { useGetProjectsByPageMutation } from '../../store/api';

import useAppToaster from '../../hooks/use-app-toaster';
import LayoutWrapper from '../../components/layout-wrapper/layout-wrapper';

const columns = [
  { id: 'name', name: 'Название проекта', width: '100%' },
  // { id: 'id', name: 'id', width: 60 },
];
const MyTable = withTableActions(Table);

export default function ProjectsPage() {
  const { showError } = useAppToaster();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const projects = useAppSelector(projectsSelector);
  const total = useAppSelector(projectsTotalSelector);
  const [state, setState] = useState({ page: Number(searchParams.get('page')) || 1, pageSize: 10 });
  const [getProjects, { isLoading }] = useGetProjectsByPageMutation();
  const [removeProject] = useRemoveProjectMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingProjectId, setPendingProjectId] = useState<number | null>(null);

  const openDeleteModal = useCallback((documentId: number) => {
    setPendingProjectId(documentId);
    setIsModalOpen(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (pendingProjectId) {
      await removeProject(pendingProjectId);
      setIsModalOpen(false);
      setPendingProjectId(null);
      // getProjects(state.page);
    }
  }, [pendingProjectId, removeProject]);

  const cancelDelete = useCallback(() => {
    setIsModalOpen(false);
    setPendingProjectId(null);
  }, []);

  const getRowActions = useCallback((
    item: TableDataItem,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _index: number,
  ): TableActionConfig<TableDataItem>[] => [
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
  ], [navigate, openDeleteModal]);

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
    (rowData: TableDataItem) => navigate(`/project/${rowData.id}`),
    [navigate],
  );
  const onAddProjectClick = useCallback(() => navigate('add'), [navigate]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        handleChange('page', `${state.page}`);
        const data = await getProjects(+state.page).unwrap();

        if (!isMounted) return;

        dispatch(setProjects(data));
      } catch (error) {
        // dispatch(setError({ error: error.message }));
        showError(`${error}`, 'Ошибка при загрузке проектов');
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [getProjects, dispatch, state.page]);

  return (
    <LayoutWrapper isLoading={isLoading}>
      <div className="content">
        <Text variant="header-1">Проекты</Text>
        <Button
          view="action"
          size="m"
          onClick={onAddProjectClick}
        >
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
    </LayoutWrapper>
  );
}
