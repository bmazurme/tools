import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SigninLayout from '../../layouts/signin-layout/signin-layout';
import { useIsAuthenticated } from '../../hooks/use-is-authenticated';

function SignInPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isChecking } = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/projects', { replace: true });
    }
  }, [isAuthenticated, isChecking, navigate]);

  return (<SigninLayout />);
}

export default SignInPage;
