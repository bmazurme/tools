import Content from '../../components/content/content';
import ProtectedWrapper from '../../hocs/protected-wrapper';

import RedirectToLogin from '../../hocs/redirect-to-login';
import DocumentsLayout from './documents-layout';

export default function DocumentsPage() {
  return (
    <Content sidebar>
      <ProtectedWrapper fallback={<RedirectToLogin />}>
        <DocumentsLayout />
      </ProtectedWrapper>
    </Content>
  );
}
