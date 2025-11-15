import { useNavigate } from 'react-router-dom';
import { Button, Card, Text } from '@gravity-ui/uikit';

import style from './main-page.module.css';
import useUser from '../../hooks/use-user';

export default function MainPage() {
  const user = useUser();
  const navigate = useNavigate();
  const handleProjects = () => navigate('/signin');

  return (
    <div className={style.page}>
      <div className={style.header}>
        <div className={style.logo}>
          <Text variant="header-2">
            tools.ntlstl
          </Text>
        </div>
        <div className={style.navbar}>
          <Button
            view="flat"
            size="l"
            onClick={handleProjects}
          >
            {!user ? 'Войти' : user.email }
          </Button>
        </div>
      </div>
      <div className={style.description}>
        Main
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Voluptates asperiores accusamus est, ab rerum harum hic delectus fuga veniam!
        Hic, atque, quia sunt consectetur eius corrupti,
        expedita sapiente exercitationem aperiam quibusdam libero ipsa veritatis quisquam!
      </div>
      <div className={style.cards}>
        <Card
          className={style.card}
          theme="normal"
          size="l"
        >
          Водоснабжение
        </Card>
        <Card
          className={style.card}
          theme="info"
          size="l"
        >
          Водоотведение
        </Card>
        <Card
          className={style.card}
          theme="success"
          size="l"
        >
          Success
        </Card>
        <Card
          className={style.card}
          theme="warning"
          size="l"
        >
          Warning
        </Card>
        <Card
          className={style.card}
          theme="danger"
          size="l"
        >
          Danger
        </Card>
        <Card
          className={style.card}
          theme="utility"
          size="l"
        >
          Utility
        </Card>
      </div>
    </div>
  );
}
