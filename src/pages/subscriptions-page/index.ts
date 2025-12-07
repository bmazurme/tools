import withUser from '../../hocs/with-user';
import SubscriptionsPage from './subscriptions-page';

export default withUser(SubscriptionsPage, true) as typeof SubscriptionsPage;
