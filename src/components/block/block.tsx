import { Button, Icon, TextInput } from '@gravity-ui/uikit';
import { SquareMinus } from '@gravity-ui/icons';

export default function Block({ action, value }: { action: () => void; value: string }) {
  return (
    <div className="block_header">
      <TextInput
        placeholder="Placeholder"
        size="m"
        value={value}
      />
      <Button
        view="outlined"
        size="m"
        onClick={action}
        title="Удалить блок"
      >
        <Icon
          data={SquareMinus}
          size={18}
        />
      </Button>
    </div>
  );
}
