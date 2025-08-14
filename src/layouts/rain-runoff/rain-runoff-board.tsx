import { v4 as uuidv4 } from 'uuid';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Block from './rain-runoff-block';

import { addRainRunoffBlock, rainRunoffsSelector } from '../../store';
import { useAppDispatch, useAppSelector } from '../../hooks';

export default function Board() {
  const dispatch = useAppDispatch();
  const { blocks } = useAppSelector(rainRunoffsSelector);
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
        onClick={() => dispatch(addRainRunoffBlock({}))}
      >
        Добавить блок
      </button>
    </DndProvider>
  );
}
