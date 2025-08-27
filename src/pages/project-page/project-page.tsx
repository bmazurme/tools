import { Outlet } from 'react-router-dom';
import { Text } from '@gravity-ui/uikit';

import Content from '../../components/content/content';
import BackButton from '../../components/back-button/back-button';

export default function ProjectPage() {
  return (
    <Content sidebar>
      <div className="content">
        <BackButton />

        <div className="project_main">
          <Text variant="header-1">Project Page</Text>
          <Outlet />
        </div>

      </div>
    </Content>
  );
}
