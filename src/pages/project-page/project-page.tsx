import Content from '../../components/content/content';
import ProtectedWrapper from '../../hocs/protected-wrapper';
import RedirectToLogin from '../../hocs/redirect-to-login';
import ProjectLayout from './project-layout';

export default function ProjectPage() {
  return (
    <ProtectedWrapper fallback={<RedirectToLogin />}>
      <Content sidebar>
        <ProjectLayout />
      </Content>
    </ProtectedWrapper>

  );
}
