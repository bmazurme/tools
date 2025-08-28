import withUser from '../../hocs/with-user';
import DocumentsPage from './documents-page';

export default withUser(DocumentsPage, true) as typeof DocumentsPage;
