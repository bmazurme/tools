import withUser from '../../hocs/with-user';
import ProjectAddPage from './project-add-page';

export default withUser(ProjectAddPage, true) as typeof ProjectAddPage;
