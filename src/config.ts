import { type InputControlSize } from '@gravity-ui/uikit';

const TARGET_TYPE = {
  BLOCKS: 'blocks',
  ITEMS: 'items',
};

// eslint-disable-next-line import/prefer-default-export
export { TARGET_TYPE };

export const BACK_BUTTON_PROPS = {
  view: 'flat' as const,
  size: 'm' as const,
  // children: (
  //   <>
  //     <Icon data={ArrowLeft} size={18} />
  //     Назад
  //   </>
  // ),
};

export const TEXT_INPUT_PROPS = {
  size: 'l' as InputControlSize,
  type: 'text' as const,
};
