import { v4 as uuidv4 } from 'uuid';
import { Breadcrumbs } from '@gravity-ui/uikit';
import { useLocation, useNavigate } from 'react-router-dom';

function NavigationBreadcrumbs() {
  const location = useLocation();
  const navigate = useNavigate();

  const dict: Record<string, string> = {
    project: 'Проекты',
    projects: 'Проекты',
    profile: 'Профиль',
    document: 'Документы',
    add: 'Добавить',
    edit: 'Редактировать',
    'rain-roof': 'Расчет дождевых вод',
  };

  const paths = location.pathname
    .slice(1) // Убираем начальный слеш
    .split('/')
    .filter((path) => path);

  return (
    <Breadcrumbs>
      {/* Добавляем ссылку на главную страницу */}
      <Breadcrumbs.Item onClick={() => navigate('/')}>
        Главная
      </Breadcrumbs.Item>

      {/* Генерируем остальные элементы */}
      {paths.map((path, index) => {
        const to = `/${paths.slice(0, index + 1).join('/')}`;

        return (
          <Breadcrumbs.Item
            key={uuidv4()}
            onClick={() => navigate(to)}
          >
            {dict[path] ?? path.charAt(0).toUpperCase() + path.slice(1)}
          </Breadcrumbs.Item>
        );
      })}
    </Breadcrumbs>
  );
}

export default NavigationBreadcrumbs;
