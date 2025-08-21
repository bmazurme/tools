import { useNavigate } from 'react-router-dom';
import {
  Button, Icon, Text, TextInput,
} from '@gravity-ui/uikit';
import { ArrowLeft } from '@gravity-ui/icons';

import Content from '../../components/content/content';

export default function ProfilePage() {
  const navigate = useNavigate();

  return (
    <Content sidebar>
      <div className="content">
        <Button view="flat" size="m" onClick={() => navigate(-1)}>
          <Icon data={ArrowLeft} size={18} />
          Назад
        </Button>

        <div className="project_main">
          <Text variant="header-1">Профиль</Text>
        </div>
        <TextInput placeholder="Placeholder" size="l" />
        <TextInput placeholder="Placeholder" size="l" />

        <div className="buttons">
          <Button view="action" size="l" type="submit">
            Сохранить
          </Button>
          <Button view="flat" size="l" onClick={() => navigate(-1)}>
            Отменить
          </Button>
        </div>

      </div>
    </Content>
  );
}
