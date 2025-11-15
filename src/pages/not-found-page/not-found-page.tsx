import { useNavigate } from 'react-router-dom';
import { Button, Text } from '@gravity-ui/uikit';

import style from './not-found-page.module.css';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className={style.page}>
      <Text variant="header-2">
        404 — Страница не найдена
      </Text>
      <Text variant="header-1" className={style.description}>
        К сожалению, запрошенная страница не существует.
      </Text>
      <Button
        view="action"
        size="l"
        onClick={() => navigate('/')}
      >
        Вернуться на главную
      </Button>
    </div>
  );
}
