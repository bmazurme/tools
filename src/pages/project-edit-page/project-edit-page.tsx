import Content from '../../components/content/content';
import ProjectEditLayout from './project-edit-layout';

import ProtectedWrapper from '../../hocs/protected-wrapper';
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
