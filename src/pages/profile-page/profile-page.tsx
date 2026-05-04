import Content from '../../components/content/content';
import ProtectedWrapper from '../../hocs/protected-wrapper';

import RedirectToLogin from '../../hocs/redirect-to-login';
import ProfileLayout from './profile-layout';

export default function ProfilePage() {
  return (
    <Content sidebar>
      <ProtectedWrapper fallback={<RedirectToLogin />}>
        <ProfileLayout />
      </ProtectedWrapper>
    </Content>
  );
}
