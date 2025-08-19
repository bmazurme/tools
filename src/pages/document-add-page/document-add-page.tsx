import { useNavigate, useParams } from 'react-router-dom';
import {
  Button, Icon, Select, Text, TextInput,
} from '@gravity-ui/uikit';
import { ArrowLeft } from '@gravity-ui/icons';

import { useAppDispatch, useAppSelector } from '../../hooks';
import Content from '../../components/content/content';
import { addDocument, documentsSelector } from '../../store';

export default function DocumentAddPage() {
  const dispatch = useAppDispatch();
  const documents = useAppSelector(documentsSelector);
  const navigate = useNavigate();
  const { projectId } = useParams();

  const onSubmit = () => {
    dispatch(addDocument({
      data: {
        id: documents.length,
        name: ` Документ ${documents.length}`,
        type: {
          id: documents.length % 2 ? 1 : 0,
          name: documents.length % 2 ? 'WS' : 'S',
          link: documents.length % 2 ? 'rain-roof' : 'rain-runoff',
        },
      },
    }));
    navigate(`/project/${projectId}/document/${documents.length}/rain-roof`);
  };

  return (
    <Content sidebar>
      <div className="content">
        <Button view="flat" size="m" onClick={() => navigate(-1)}>
          <Icon data={ArrowLeft} size={18} />
          Назад
        </Button>

        <Text variant="header-1">Добавить документ</Text>
        <TextInput placeholder="Placeholder" label="Название" size="l" />
        <Select
          placeholder="Custom filter"
          size="l"
          width="max"
        >
          <Select.Option value="val_1">
            Value 1
          </Select.Option>
        </Select>
        <TextInput placeholder="Placeholder" label="Описание" size="l" />

        <div className="buttons">
          <Button view="action" size="l" onClick={onSubmit}>
            Сохранить
          </Button>
          <Button view="flat" size="l" onClick={() => navigate('/projects')}>
            Отменить
          </Button>
        </div>
      </div>
    </Content>
  );
}
