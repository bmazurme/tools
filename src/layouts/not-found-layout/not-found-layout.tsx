import { useNavigate } from 'react-router-dom';
import { Button, Text } from '@gravity-ui/uikit';

import style from './not-found-layout.module.css';

interface NotFoundProps {
  title: string;
  description: string;
  buttonLabel: string;
}

export default function NotFoundPage({ title, description, buttonLabel }: NotFoundProps) {
  const navigate = useNavigate();

  return (
    <div className={style.page}>
      <Text variant="header-2">
        {title}
      </Text>
      <Text
        variant="header-1"
        className={style.description}
      >
        {description}
      </Text>
      <Button
        view="action"
        size="l"
        onClick={() => navigate('/')}
      >
        {buttonLabel}
      </Button>
    </div>
  );
}
