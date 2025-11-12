import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SigninLayout from '../../layouts/signin-layout/signin-layout';
import withUser from '../../hocs/with-user';
import useUser from '../../hooks/use-user';

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

export default withUser(SignInPage, false);
