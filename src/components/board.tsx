import { v4 as uuidv4 } from 'uuid';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Block from './block';

import { addRainRoofBlock, rainRoofsSelector } from '../store';
import { useAppSelector, useAppDispatch } from '../hooks';

export default function Board() {
  const dispatch = useAppDispatch();
  const { blocks } = useAppSelector(rainRoofsSelector);
  // console.log(blocks);
  const onHandleAddBlock = () => dispatch(addRainRoofBlock({}));
  const returnBlocksForColumn = () => blocks.map((block, index) => (
    <Block
      key={uuidv4()}
      block={block}
      index={index}
    />
  ));

  return (
    <DndProvider backend={HTML5Backend}>
      {returnBlocksForColumn()}
      <button
        title="Добавить блок"
        onClick={onHandleAddBlock}
      >
        Добавить блок
      </button>
    </DndProvider>
  );
}
