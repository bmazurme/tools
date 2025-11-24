import { useParams } from 'react-router-dom';

export default function RainRoofDetailPage() {
  const { itemId } = useParams<{ itemId: string }>();
  console.log(itemId);

  return (
    <div>{itemId}</div>
  );
}
