import withUser from '../../hocs/with-user';
import DocumentPage from './document-page';

export default withUser(DocumentPage, true) as typeof DocumentPage;
