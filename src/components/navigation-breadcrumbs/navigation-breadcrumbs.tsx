import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Breadcrumbs } from '@gravity-ui/uikit';

interface BreadcrumbItem {
  label: string;
  path: string;
}

export default function NavigationBreadcrumbs() {
  const location = useLocation();
  const navigate = useNavigate();

  // Словарь переводов путей в читаемые названия
  const translationDict: Record<string, string> = {
    project: 'Проекты',
    projects: 'Проекты',
    profile: 'Профиль',
    document: 'Документы',
    add: 'Добавить',
    edit: 'Редактировать',
    'rain-roof': 'Расчёт дождевых вод с кровли',
    'rain-runoff': 'Расчёт дождевых вод с территории',
  };

  // Функция для капитализации первой буквы
  const capitalize = (str: string): string => ((!str)
    ? str
    : str.charAt(0).toUpperCase() + str.slice(1).toLowerCase());

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
      const label = translationDict[path] ?? capitalize(path);
      items.push({ label, path: to });
    });

    return items;
  }, [location.pathname]);

  return (
    <Breadcrumbs>
      {breadcrumbItems.map((item) => (
        <Breadcrumbs.Item
          key={item.path || uuidv4()}
          onClick={() => navigate(item.path)}
          aria-label={`Перейти на страницу: ${item.label}`}
        >
          {item.label}
        </Breadcrumbs.Item>
      ))}
    </Breadcrumbs>
  );
}
