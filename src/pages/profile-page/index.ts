import withUser from '../../hocs/with-user';
import ProfilePage from './profile-page';

export default withUser(ProfilePage, true) as typeof ProfilePage;
