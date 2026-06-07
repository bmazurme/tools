import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '@gravity-ui/uikit';

interface BreadcrumbItem {
  label: string;
  path: string;
}

// Словарь переводов путей в читаемые названия
const TRANSLATION_DICT: Record<string, string> = {
  project: 'Проекты',
  projects: 'Проекты',
  profile: 'Профиль',
  document: 'Документы',
  add: 'Добавить',
  edit: 'Редактировать',
  subscriptions: 'Подписка',
  settings: 'Настройки',
  chat: 'AI-ассистент',
  'rain-roof': 'Расчёт дождевых вод с кровли',
  'rain-runoff': 'Расчёт дождевых вод с территории',
  'heat-consumption': 'Расчет тепла для приготовления горячей воды',
  'throttle-plate': 'Расчёт диаметра отверстия дроссельной шайбы',
  'pipe-diameter-calculation': 'Расчёт диаметра трубопровода',
};

// Капитализация первой буквы
const capitalize = (str: string): string => ((!str)
  ? str
  : str.charAt(0).toUpperCase() + str.slice(1).toLowerCase());

export default function NavigationBreadcrumbs() {
  const location = useLocation();
  const navigate = useNavigate();

  // Мемоизированный расчёт путей и элементов хлебных крошек
  const breadcrumbItems = useMemo((): BreadcrumbItem[] => {
    const paths = location.pathname
      .slice(1) // Убираем начальный слеш
      .split('/')
      .filter(Boolean); // Удаляем пустые строки

    const items: BreadcrumbItem[] = [
      { label: 'Главная', path: '/' },
    ];

    paths.forEach((path, index) => {
      const to = `/${paths.slice(0, index + 1).join('/')}`;
      const label = TRANSLATION_DICT[path] ?? capitalize(path);
      items.push({ label, path: to });
    });

    return items;
  }, [location.pathname]);

  return (
    <Breadcrumbs>
      {breadcrumbItems.map((item) => (
        <Breadcrumbs.Item
          key={item.path}
          onClick={() => navigate(item.path)}
          aria-label={`Перейти на страницу: ${item.label}`}
        >
          {item.label}
        </Breadcrumbs.Item>
      ))}
    </Breadcrumbs>
  );
}
