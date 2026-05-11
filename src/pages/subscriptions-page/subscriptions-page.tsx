import Content from '../../components/content/content';
import SubscriptionsLayout from './subscriptions-layout';

import ProtectedWrapper from '../../hocs/protected-wrapper';
import RedirectToLogin from '../../hocs/redirect-to-login';

export default function SubscriptionsPage() {
  return (
    <ProtectedWrapper fallback={<RedirectToLogin />}>
      <Content sidebar>
        <SubscriptionsLayout />
      </Content>
    </ProtectedWrapper>
  );
}
