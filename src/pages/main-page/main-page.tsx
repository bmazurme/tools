import { useNavigate } from 'react-router-dom';
import { Button, Card } from '@gravity-ui/uikit';

export default function MainPage() {
  const navigate = useNavigate();
  const handleProjects = () => navigate('/signin');
  const style = {
    width: '320px',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  return (
    <>
      Main
      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      Voluptates asperiores accusamus est, ab rerum harum hic delectus fuga veniam!
      Hic, atque, quia sunt consectetur eius corrupti,
      expedita sapiente exercitationem aperiam quibusdam libero ipsa veritatis quisquam!
      <Button view="flat" size="l" onClick={handleProjects}>
        Войти
      </Button>
      <Card style={style} theme="normal" size="l">Водоснабжение</Card>
      <Card style={style} theme="info" size="l">Водоотведение</Card>
      <Card style={style} theme="success" size="l">Success</Card>
      <Card style={style} theme="warning" size="l">Warning</Card>
      <Card style={style} theme="danger" size="l">Danger</Card>
      <Card style={style} theme="utility" size="l">Utility</Card>
    </>
  );
}
