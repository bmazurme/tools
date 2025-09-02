import { type InputControlSize } from '@gravity-ui/uikit';

const TARGET_TYPE = {
  BLOCKS: 'blocks',
  ITEMS: 'items',
};

export { TARGET_TYPE };

export const BACK_BUTTON_PROPS = {
  view: 'flat' as const,
  size: 'm' as const,
};

export const TEXT_INPUT_PROPS = {
  size: 'l' as InputControlSize,
  type: 'text' as const,
};
