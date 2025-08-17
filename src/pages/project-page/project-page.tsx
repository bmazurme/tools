import { Outlet, useNavigate } from 'react-router-dom';
import { Button, Icon, Text } from '@gravity-ui/uikit';
import { ArrowLeft } from '@gravity-ui/icons';

import Content from '../../components/content/content';

import style from './project-page.module.css';

export default function ProjectPage() {
  const navigate = useNavigate();
  
  return (
    <Content menu={[]} sidebar>
      <div className="content">
        <Button view="flat" size="m" onClick={() => navigate(-1)}>
          <Icon data={ArrowLeft} size={18} />
          Назад
        </Button>
        <div className={style.main}>
          <Text variant="header-1">Project Page</Text>
          <Outlet />
        </div>

      </div>
    </Content>
  );
}
