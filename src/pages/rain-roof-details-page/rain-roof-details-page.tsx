import { useParams } from 'react-router-dom';
import { Modal } from '@gravity-ui/uikit';

export default function RainRoofDetailPage() {
  const { itemId } = useParams<{ itemId: string }>();
  console.log(itemId);

  return (
    <Modal open disableOutsideClick>
      <div>tmp</div>
    </Modal>
  );
}
