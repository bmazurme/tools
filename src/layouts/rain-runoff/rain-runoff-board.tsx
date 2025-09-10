import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button } from '@gravity-ui/uikit';

import Block from './rain-runoff-block';

import { blocksSelector, useCreateBlockMutation } from '../../store';
import { useAppSelector } from '../../hooks';

export default function RainRunoffBoard() {
  const { id } = useParams();
  const [createBlock] = useCreateBlockMutation();
  const { blocks } = useAppSelector(blocksSelector) ?? { blocks: [] };
  const onHandleAddBlock = async () => {
    if (document) {
      await createBlock({ document: { id: Number(id) }, index: blocks.length + 1 });
    }
  };

  const returnBlocksForColumn = () => blocks.map((block: BlockType, index: number) => (
    <Block
      key={uuidv4()}
      block={block}
      index={index}
    />
  ));

  return (
    <DndProvider backend={HTML5Backend}>
      {returnBlocksForColumn()}
      <Button
        view="action"
        size="m"
        title="Добавить блок"
        onClick={onHandleAddBlock}
      >
        Добавить блок
      </Button>
    </DndProvider>
  );
}
