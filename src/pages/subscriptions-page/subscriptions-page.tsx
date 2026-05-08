import Content from '../../components/content/content';
import ProtectedWrapper from '../../hocs/protected-wrapper';

import RedirectToLogin from '../../hocs/redirect-to-login';
import SubscriptionsLayout from './subscriptions-layout';

export default function SubscriptionsPage() {
  return (
    <ProtectedWrapper fallback={<RedirectToLogin />}>
      <Content sidebar>
        <SubscriptionsLayout />
      </Content>
    </ProtectedWrapper>
  );
}
