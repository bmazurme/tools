import { Button, Text } from '@gravity-ui/uikit';
import { useNavigate } from 'react-router-dom';

import style from './signin-layout.module.css';

export default function SigninLayout() {
  const navigate = useNavigate();
  return (
    <div className={style.container}>
      <Text variant="header-1">Sign in</Text>
      <Button
        view="normal-contrast"
        size="l"
        onClick={() => navigate('/projects')}
      >
        Normal Contrast
      </Button>
    </div>
  );
}
