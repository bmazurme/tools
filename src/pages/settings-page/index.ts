import withUser from '../../hocs/with-user';
import SettingsPage from './settings-page';

export default withUser(SettingsPage, true) as typeof SettingsPage;
