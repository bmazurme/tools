import Content from '../../components/content/content';
import ProtectedWrapper from '../../hocs/protected-wrapper';

import RedirectToLogin from '../../hocs/redirect-to-login';
import DocumentsLayout from './documents-layout';

export default function DocumentsPage() {
  return (
    <ProtectedWrapper fallback={<RedirectToLogin />}>
      <Content sidebar>
        <DocumentsLayout />
      </Content>
    </ProtectedWrapper>
  );
}
