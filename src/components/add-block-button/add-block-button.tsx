import { Button } from '@gravity-ui/uikit';

interface AddBlockButtonProps {
  onHandleAddBlock: () => void;
  isCreatingBlock: boolean;
}

export default function AddBlockButton({ onHandleAddBlock, isCreatingBlock }:AddBlockButtonProps) {
  return (
    <Button
      view="action"
      size="m"
      title="Добавить блок"
      onClick={onHandleAddBlock}
      loading={isCreatingBlock}
      disabled={isCreatingBlock}
    >
      Добавить блок
    </Button>
  );
}
