import { useNavigate } from 'react-router-dom';
import { Button } from '@gravity-ui/uikit';

export default function MainPage() {
  const navigate = useNavigate();
  const handleProjects = () => navigate('/projects');
  return (
    <>
      Main
      <Button view="flat" size="l" onClick={handleProjects}>
        Проекты
      </Button>
    </>
  );
}
