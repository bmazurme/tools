import { Card, Text } from '@gravity-ui/uikit';
import { VITE_TOKEN } from '../../utils/constants';

import yaOauthWhite from '../../../public/ya-oauth-white.svg';
import style from './signin-layout.module.css';

export default function SigninLayout() {
  const URL = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${VITE_TOKEN}`;

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
            <a href={URL}>
              <img src={yaOauthWhite} alt="Sign in with Yandex ID" />
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
