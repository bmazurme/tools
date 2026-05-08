import Content from '../../components/content/content';
import ProtectedWrapper from '../../hocs/protected-wrapper';

import RedirectToLogin from '../../hocs/redirect-to-login';
import SettingsLayout from './settings-layout';

export default function SettingsPage() {
  return (
    <ProtectedWrapper fallback={<RedirectToLogin />}>
      <Content sidebar>
        <SettingsLayout />
      </Content>
    </ProtectedWrapper>
  );
}
