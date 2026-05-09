import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import style from './redirect-to-login.module.css';

function RedirectToLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/signin', { replace: true });
    }, 500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={style.container}>
      Перенаправление на страницу входа...
    </div>
  );
}

export default RedirectToLogin;
