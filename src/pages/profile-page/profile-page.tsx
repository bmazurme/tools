import Content from '../../components/content/content';
import ProfileLayout from './profile-layout';

import ProtectedWrapper from '../../hocs/protected-wrapper';
import RedirectToLogin from '../../hocs/redirect-to-login';

export default function ProfilePage() {
  return (
    <ProtectedWrapper fallback={<RedirectToLogin />}>
      <Content sidebar>
        <ProfileLayout />
      </Content>
    </ProtectedWrapper>
  );
}
