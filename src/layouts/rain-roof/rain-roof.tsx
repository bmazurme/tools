import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Board from './rain-roof-board';

import { useGetBlocksMutation, useGetRainRoofsItemsMutation, documentSelector } from '../../store';
import { useAppSelector } from '../../hooks';

export default function RainRoofLayout() {
  const { id, typeId } = useParams();
  const document = useAppSelector(documentSelector);
  const [getBlock] = useGetBlocksMutation();
  const [getItems] = useGetRainRoofsItemsMutation();

  useEffect(() => {
    if (id) {
      getBlock(Number(id));
      getItems(Number(id));
    }
  }, [getBlock, id]);

  return (
    <div className="gapb">
      {document?.type.link !== typeId ? <>error</> : <Board />}
    </div>
  );
}
