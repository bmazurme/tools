import Content from '../../components/content/content';
import ProtectedWrapper from '../../hocs/protected-wrapper';

import ProjectEditLayout from './project-edit-layout';
import RedirectToLogin from '../../hocs/redirect-to-login';

export default function ProjectEditPage() {
  return (
    <Content sidebar>
      <ProtectedWrapper fallback={<RedirectToLogin />}>
        <ProjectEditLayout />
      </ProtectedWrapper>
    </Content>
  );
}
