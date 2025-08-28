import withUser from '../../hocs/with-user';
import DocumentAddPage from './document-add-page';

export default withUser(DocumentAddPage, true) as typeof DocumentAddPage;
