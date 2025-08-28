import withUser from '../../hocs/with-user';
import ProjectEditPage from './project-edit-page';

export default withUser(ProjectEditPage, true) as typeof ProjectEditPage;
