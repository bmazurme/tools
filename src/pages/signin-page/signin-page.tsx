import SigninLayout from '../../layouts/signin-layout/signin-layout';
import withUser from '../../hocs/with-user';

function SignInPage() {
  return (<SigninLayout />);
}

export default withUser(SignInPage, false);
