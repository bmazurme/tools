import { useNavigate } from 'react-router-dom';
import { Button, Card, Text } from '@gravity-ui/uikit';

import useUser from '../../hooks/use-user';
import { useIsAuthenticated } from '../../hooks/use-is-authenticated';

import style from './main-page.module.css';

export default function MainPage() {
  useIsAuthenticated();
  const { user } = useUser();
  const navigate = useNavigate();
  const handleProjects = () => navigate('/signin');

  return (
    <div className={style.page}>
      <div className={style.header}>
        <div className={style.logo}>
          <Text variant="header-2">
            tools.ntlstl
          </Text>
        </div>
        <div className={style.navbar}>
          <Button
            view="flat"
            size="l"
            onClick={handleProjects}
          >
            {!user ? 'Войти' : user.email }
          </Button>
        </div>
      </div>

      <div className={style.contentWrapper}>
        <div className={style.description}>
          <div className={style.text}>
            Сервис создан для проектировщиков и строительных организаций.
          </div>
          <div className={style.text}>
            Мгновенный результат и готовый отчёт для проектной документации.
          </div>
          <div className={style.text}>
            Интуитивный интерфейс — не требует длительного обучения.
          </div>
        </div>

        <div className={style.container}>
          <Text variant="header-2" className={style.sectionTitle}>
            Модули
          </Text>
          <div className={style.cardsGrid}>
            <Card
              className={style.card}
              theme="normal"
              view="filled"
              size="l"
            >
              <Text variant="subheader-3">Водоснабжение</Text>
            </Card>
            <Card
              className={style.card}
              theme="normal"
              view="filled"
              size="l"
            >
              <Text variant="subheader-3">Водоотведение</Text>
              <div className={style.list}>
                <Text variant="body-1">Расчет дождевых вод СП 30.13330.2020</Text>
                <Text variant="body-1">Расчет дождевых вод СП 32.13330.2018</Text>
              </div>
            </Card>

            <Card
              className={style.card}
              theme="normal"
              view="filled"
              size="l"
            >
              Success
            </Card>
            <Card
              className={style.card}
              theme="normal"
              view="filled"
              size="l"
            >
              Warning
            </Card>
            <Card
              className={style.card}
              theme="normal"
              view="filled"
              size="l"
            >
              Danger
            </Card>
            <Card
              className={style.card}
              theme="normal"
              view="filled"
              size="l"
            >
              Utility
            </Card>
          </div>
        </div>

        <div className={style.description}>
          <div className={style.text}>
            Ответственность за окончательное проектное решение несёт инженер‑проектировщик.
          </div>
        </div>
      </div>
    </div>
  );
}
