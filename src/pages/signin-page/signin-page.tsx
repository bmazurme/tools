import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SigninLayout from '../../layouts/signin-layout/signin-layout';
import withUser from '../../hocs/with-user';
import useUser from '../../hooks/use-user';

// eslint-disable-next-line react-refresh/only-export-components
function SignInPage() {
  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    if (user) {
      navigate('/projects', { replace: true });
    }
  }, [user, navigate]);

  return (<SigninLayout />);
}

// eslint-disable-next-line react-refresh/only-export-components
export default withUser(SignInPage, false);
