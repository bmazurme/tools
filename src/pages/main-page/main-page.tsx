/* eslint-disable max-len */
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
  const handleCalculate = () => navigate('/projects');

  return (
    <div className={style.page}>
      <header className={style.header}>
        <div className={style.logo}>
          <Text variant="header-2" as="h1">
            tools.ntlstl
          </Text>
        </div>
        <nav className={style.navbar}>
          <Button
            view="flat"
            size="l"
            onClick={handleProjects}
          >
            {!user ? 'Войти' : user.email}
          </Button>
        </nav>
      </header>

      <main className={style.contentWrapper}>
        {/* Основной баннер с описанием */}
        <section className={style.hero}>
          <div className={style.heroContent}>
            <Text variant="display-1" className={style.heroTitle}>
              Инженерные расчёты онлайн
            </Text>
            <div className={style.heroDescription}>
              <Text variant="body-2">
                Сервис для инженеров‑проектировщиков, архитекторов и строительных организаций.
              </Text>
              <Text variant="body-2">
                Мгновенный расчёт и готовый отчёт для проектной документации. Интуитивный интерфейс — начните работу без обучения.
              </Text>
            </div>
            <Button
              view="action"
              size="xl"
              className={style.ctaButton}
              onClick={handleCalculate}
            >
              Создать проект
            </Button>
          </div>
        </section>

        {/* Секция модулей */}
        <section className={style.modulesSection}>
          <Text variant="header-2" className={style.sectionTitle}>
            Доступные модули для расчёта
          </Text>
          <div className={style.cardsGrid}>
            <Card
              className={style.card}
              theme="normal"
              view="filled"
              size="l"
            >
              <Text variant="subheader-3">Водоснабжение</Text>
              <div className={style.list}>
                <Text variant="body-1">
                  Расчёт расхода тепла СП 30.13330.2020
                </Text>
              </div>
            </Card>
            <Card
              className={style.card}
              theme="normal"
              view="filled"
              size="l"
            >
              <Text variant="subheader-3">Водоотведение</Text>
              <div className={style.list}>
                <Text variant="body-1">
                  Расчёт дождевых вод СП 30.13330.2020
                </Text>
                <Text variant="body-1">
                  Расчёт дождевых вод СП 32.13330.2018
                </Text>
              </div>
            </Card>
            <Card className={style.card} theme="normal" view="filled" size="l">
              <Text variant="subheader-3">Гидравлика</Text>
              <div className={style.list}>
                <Text variant="body-1">
                  Расчёт диаметра отверстия дроссельной шайбы
                </Text>
              </div>
            </Card>
            <Card className={style.card} theme="normal" view="filled" size="l">
              <Text variant="subheader-3">Теплотехника</Text>
            </Card>
          </div>
        </section>

        {/* Футер секции */}
        <footer className={style.footer}>
          <Text variant="caption-1" className={style.disclaimer}>
            Ответственность за окончательное проектное решение несёт инженер‑проектировщик.
          </Text>
        </footer>
      </main>
    </div>
  );
}
