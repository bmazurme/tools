import Content from '../../components/content/content';
import ProtectedWrapper from '../../hocs/protected-wrapper';

import RedirectToLogin from '../../hocs/redirect-to-login';
import ProjectsLayout from './projects-layout';

export default function ProjectsPage() {
  return (
    <ProtectedWrapper fallback={<RedirectToLogin />}>
      <Content sidebar>
        <ProjectsLayout />
      </Content>
    </ProtectedWrapper>
  );
}
