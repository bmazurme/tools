import { useNavigate } from 'react-router-dom';
import {
  Button, Icon, Select, Text, TextInput,
} from '@gravity-ui/uikit';
import { ArrowLeft } from '@gravity-ui/icons';

import Content from '../../components/content/content';
import style from './document-add-page.module.css';

export default function DocumentAddPage() {
  const navigate = useNavigate();

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
        <div className={style.buttons}>
          <Button view="action" size="l" onClick={() => navigate('/project/2/document/1/rain-roof')}>
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
