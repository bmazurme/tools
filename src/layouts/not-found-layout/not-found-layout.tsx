import { useNavigate } from 'react-router-dom';
import { Button, Icon, Text } from '@gravity-ui/uikit';
import { ArrowRight } from '@gravity-ui/icons';

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
      <span className={style.code}>404</span>
      <Text variant="header-1">
        {title}
      </Text>
      <Text
        variant="body-2"
        color="secondary"
        className={style.description}
      >
        {description}
      </Text>
      <Button
        view="action"
        size="l"
        className={style.button}
        onClick={() => navigate('/')}
      >
        {buttonLabel}
        <Icon data={ArrowRight} size={18} />
      </Button>
    </div>
  );
}
