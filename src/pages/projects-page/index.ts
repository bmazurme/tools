import withUser from '../../hocs/with-user';
import ProjectsPage from './projects-page';

export default withUser(ProjectsPage, true) as typeof ProjectsPage;
