/* eslint-disable react/jsx-props-no-spreading */
import { useNavigate } from 'react-router-dom';
import {
  Card, Text, Button, Icon,
} from '@gravity-ui/uikit';
import { ArrowLeft } from '@gravity-ui/icons';

import { VITE_TOKEN } from '../../utils/constants';
import { BACK_BUTTON_PROPS } from '../../config';

import yaOauthWhite from '../../../public/ya-oauth-white.svg';
import style from './signin-layout.module.css';

export default function SigninLayout() {
  const navigate = useNavigate();
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
          <div className={style.section}>
            <Button
              {...BACK_BUTTON_PROPS}
              title="На главную"
              className={style.back}
              onClick={() => navigate('/')}
            >
              <Icon data={ArrowLeft} size={18} />
            </Button>
            <div className={style.header}>
              <Text variant="header-2">
                Tools
              </Text>
            </div>
          </div>
          <div className={style.form}>
            <Text
              variant="header-1"
              className={style.title}
            >
              Войти
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
