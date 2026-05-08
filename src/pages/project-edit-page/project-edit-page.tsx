import Content from '../../components/content/content';
import ProtectedWrapper from '../../hocs/protected-wrapper';

import ProjectEditLayout from './project-edit-layout';
import RedirectToLogin from '../../hocs/redirect-to-login';

export default function ProjectEditPage() {
  return (
    <ProtectedWrapper fallback={<RedirectToLogin />}>
      <Content sidebar>
        <ProjectEditLayout />
      </Content>
    </ProtectedWrapper>
  );
}
