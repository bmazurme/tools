import { Text } from '@gravity-ui/uikit';

type ModalHeaderProps = { itemName: string; itemSubName: string; };

export default function ModalHeader({ itemName, itemSubName }: ModalHeaderProps) {
  return (
    <>
      <Text variant="header-1">
        {itemName}
      </Text>
      <Text variant="subheader-1">
        {itemSubName}
      </Text>
    </>
  );
}
