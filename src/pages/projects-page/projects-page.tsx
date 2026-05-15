import Content from '../../components/content/content';
import ProjectsLayout from './projects-layout';

import ProtectedWrapper from '../../hocs/protected-wrapper';
import RedirectToLogin from '../../hocs/redirect-to-login';

export default function ProjectsPage() {
  return (
    <ProtectedWrapper fallback={<RedirectToLogin />}>
      <Content sidebar>
        <ProjectsLayout />
      </Content>
    </ProtectedWrapper>
  );
}
