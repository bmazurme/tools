import { Outlet } from 'react-router-dom';

import Content from '../../components/content/content';
import BackButton from '../../components/back-button/back-button';

export default function ProjectPage() {
  return (
    <Content sidebar>
      <div className="content">
        <BackButton />

        <div className="project_main">
          <Outlet />
        </div>
      </div>
    </Content>
  );
}
