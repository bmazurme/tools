import withUser from '../../hocs/with-user';
import MainPage from './main-page';

export default withUser(MainPage, false) as typeof MainPage;
