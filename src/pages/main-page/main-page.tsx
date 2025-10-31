import { useNavigate } from 'react-router-dom';
import { Button } from '@gravity-ui/uikit';

export default function MainPage() {
  const navigate = useNavigate();
  const handleProjects = () => navigate('/projects');
  return (
    <>
      Main
      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      Voluptates asperiores accusamus est, ab rerum harum hic delectus fuga veniam!
      Hic, atque, quia sunt consectetur eius corrupti,
      expedita sapiente exercitationem aperiam quibusdam libero ipsa veritatis quisquam!
      <Button view="flat" size="l" onClick={handleProjects}>
        Проекты
      </Button>
    </>
  );
}
