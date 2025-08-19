import { Outlet, useNavigate } from 'react-router-dom';
import { Button, Icon, Text } from '@gravity-ui/uikit';
import { ArrowLeft } from '@gravity-ui/icons';

import Content from '../../components/content/content';

export default function ProjectPage() {
  const navigate = useNavigate();

  return (
    <Content sidebar>
      <div className="content">
        <Button view="flat" size="m" onClick={() => navigate(-1)}>
          <Icon data={ArrowLeft} size={18} />
          Назад
        </Button>

        <div className="project_main">
          <Text variant="header-1">Project Page</Text>
          <Outlet />
        </div>
      </div>
    </Content>
  );
}
