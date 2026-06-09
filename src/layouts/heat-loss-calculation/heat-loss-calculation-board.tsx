import { useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Block from './heat-loss-calculation-block';
import AddBlockButton from '../../components/add-block-button/add-block-button';

import { blocksSelector, useCreateBlockMutation } from '../../store';
import { useAppSelector } from '../../hooks';

export default function HeatLossCalculationBoard() {
  const { id } = useParams();
  const [createBlock, { isLoading: isCreatingBlock }] = useCreateBlockMutation();
  const { blocks } = useAppSelector(blocksSelector) ?? { blocks: [] };
  const onHandleAddBlock = async () => {
    if (document) {
      await createBlock({ document: { id: Number(id) }, index: blocks.length + 1 });
    }
  };

  const returnBlocksForColumn = () => blocks
    .map((block: BlockType, index: number) => (
      <Block
        key={block.id}
        block={block}
        index={index}
      />
    ));

  return (
    <DndProvider backend={HTML5Backend}>
      {returnBlocksForColumn()}
      <div>
        <AddBlockButton
          onHandleAddBlock={onHandleAddBlock}
          isCreatingBlock={isCreatingBlock}
        />
      </div>
    </DndProvider>
  );
}
