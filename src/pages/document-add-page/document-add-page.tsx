import Content from '../../components/content/content';
import ProtectedWrapper from '../../hocs/protected-wrapper';

import RedirectToLogin from '../../hocs/redirect-to-login';
import DocumentAddLayout from './document-add-layout';

export default function DocumentAddPage() {
  return (
    <Content sidebar>
      <ProtectedWrapper fallback={<RedirectToLogin />}>
        <DocumentAddLayout />
      </ProtectedWrapper>
    </Content>
  );
}
