/* eslint-disable max-len */
import { useNavigate } from 'react-router-dom';
import {
  Button, Icon, Label, Text,
} from '@gravity-ui/uikit';
import {
  Droplet, ArrowRight, CircleFill, Moon, Sun,
} from '@gravity-ui/icons';

import WaterSupplyIcon from '../../assets/icons/water-supply-icon';
import SewageIcon from '../../assets/icons/sewage-icon';
import HydraulicsIcon from '../../assets/icons/hydraulics-icon';
import HeatIcon from '../../assets/icons/heat-icon';

import useUser from '../../hooks/use-user';
import { useIsAuthenticated } from '../../hooks/use-is-authenticated';
import useTheme from '../../hooks/use-theme';

import style from './main-page.module.css';

const MODULES = [
  {
    icon: <WaterSupplyIcon />,
    name: 'Водоснабжение',
    calcs: ['Расчёт расхода тепла — СП 30.13330'],
  },
  {
    icon: <SewageIcon />,
    name: 'Водоотведение',
    calcs: [
      'Расчёт дождевых вод — СП 30.13330',
      'Расчёт дождевых вод — СП 32.13330',
    ],
  },
  {
    icon: <HydraulicsIcon />,
    name: 'Гидравлика',
    calcs: [
      'Диаметр отверстия дроссельной шайбы',
      'Диаметр трубопровода',
      'Расчёт коллектора',
    ],
  },
  {
    icon: <HeatIcon />,
    name: 'Теплотехника',
    calcs: ['Расчёт тепловых потерь'],
  },
];

const STATS = [
  { value: '4', label: 'модуля расчёта' },
  { value: '7', label: 'методик по СП' },
  { value: 'PDF', label: 'готовый отчёт' },
];

export default function MainPage() {
  useIsAuthenticated();
  const { user } = useUser();
  const navigate = useNavigate();
  const { isDark, toggle } = useTheme();

  const handleSignIn = () => navigate('/signin');
  const handleProjects = () => navigate('/projects');

  return (
    <div className={style.page}>
      <header className={style.header}>
        <div className={style.logo}>
          <Button view="action" size="m">
            <Icon data={Droplet} size={18} />
          </Button>

          <Text variant="subheader-2">
            tools
            <span className={style.logoBrand}>.ntlstl</span>
          </Text>
        </div>
        <nav className={style.navbar}>
          <Button view="flat" size="m" onClick={toggle} aria-label="Переключить тему">
            <Icon data={isDark ? Sun : Moon} size={18} />
          </Button>
          <Button view="flat" size="m" onClick={handleSignIn}>
            {!user ? 'Войти' : user.email}
          </Button>
          <Button view="action" size="m" onClick={handleProjects}>
            Создать проект
          </Button>
        </nav>
      </header>

      <main className={style.main}>
        <section className={style.heroWrap}>
          <div className={style.heroLeft}>
            <Label theme="info" className={style.eyebrow}>
              <Icon data={CircleFill} size={6} />
              {' Сервис для проектировщиков'}
            </Label>

            <Text variant="display-1" as="h1" className={style.heroTitle}>
              Инженерные расчёты онлайн
            </Text>
            <Text variant="body-2" className={style.heroSub}>
              Для инженеров-проектировщиков, архитекторов и строительных организаций.
            </Text>
            <Text variant="body-2" className={style.heroDesc}>
              Мгновенный расчёт и готовый отчёт для проектной документации по действующим СП. Интуитивный интерфейс — начните работу без обучения.
            </Text>
            <div className={style.heroCta}>
              <Button view="action" size="xl" onClick={handleProjects}>
                Создать проект
                <Icon data={ArrowRight} size={18} />
              </Button>
              <Button view="outlined" size="xl" onClick={handleProjects}>
                Смотреть пример
              </Button>
            </div>
            <div className={style.heroStats}>
              {STATS.map(({ value, label }) => (
                <div key={label} className={style.heroStat}>
                  <Text variant="header-2" className={style.heroStatValue}>{value}</Text>
                  <Text variant="caption-2" className={style.heroStatLabel}>{label}</Text>
                </div>
              ))}
            </div>
          </div>
          <div className={style.heroPlaceholder}>
            <Text variant="caption-1" className={style.heroPlaceholderText}>
              {/* интерфейс расчёта · скриншот */}
            </Text>
          </div>
        </section>

        <section className={style.modulesWrap}>
          <div className={style.modulesHead}>
            <Text variant="header-2" as="h2" className={style.modulesTitle}>
              Доступные модули для расчёта
            </Text>
            <Text variant="body-1" className={style.modulesHint}>
              СП · ГОСТ · СНиП
            </Text>
          </div>
          <div className={style.moduleGrid}>
            {MODULES.map((m) => (
              <div key={m.name} className={style.moduleCard}>
                <div className={style.moduleIcon}>
                  {m.icon}
                </div>
                <Text variant="subheader-2">{m.name}</Text>
                <div className={style.calcList}>
                  {m.calcs.map((c) => (
                    <div key={c} className={style.calcRow}>
                      <span className={style.calcDot} />
                      <Text variant="body-1" className={style.calcText}>{c}</Text>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className={style.footer}>
          <Text variant="caption-2" className={style.disclaimer}>
            Ответственность за окончательное проектное решение несёт инженер-проектировщик.
          </Text>
          <Text variant="caption-2" className={style.copyright}>
            © 2026 tools.ntlstl
          </Text>
        </footer>
      </main>
    </div>
  );
}
