import { useNavigate } from 'react-router-dom';
import {
  Button, Card, Text,
} from '@gravity-ui/uikit';

import style from './signin-layout.module.css';

export default function SigninLayout() {
  const navigate = useNavigate();

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <Card
          style={style}
          view="filled"
          type="container"
          size="l"
          className={style.card}
        >
          <div className={style.header}>
            <Text variant="header-2">
              Tools
            </Text>
          </div>
          <div className={style.form}>
            <Text
              variant="header-1"
              className={style.title}
            >
              Sign in
            </Text>
            <a href="https://oauth.yandex.ru/authorize?response_type=code&client_id=2f47d503901842298d06b55c9ba625b4">
              Войдите с Яндекс ID
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
