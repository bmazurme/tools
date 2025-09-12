import withUser from '../../hocs/with-user';
import MainPage from './main-page';

export default withUser(MainPage, true) as typeof MainPage;
