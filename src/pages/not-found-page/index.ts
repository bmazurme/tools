import withUser from '../../hocs/with-user';
import NotFoundPage from './not-found-page';

export default withUser(NotFoundPage, false) as typeof NotFoundPage;
