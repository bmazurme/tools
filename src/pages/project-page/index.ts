import withUser from '../../hocs/with-user';
import ProjectPage from './project-page';

export default withUser(ProjectPage, true) as typeof ProjectPage;
