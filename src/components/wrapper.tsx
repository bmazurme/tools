import { useEffect, type ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@gravity-ui/uikit';

import {
  useGetBlocksMutation, useGetThrottlePlateItemsMutation, documentSelector, setItems,
} from '../store';
import { useAppDispatch, useAppSelector } from '../hooks';
import useAppToaster from '../hooks/use-app-toaster';

interface WrapperProps {
  children: ReactNode;
}

// вынести во wrapper
export default function Wrapper({ children }: WrapperProps) {
  const { showError } = useAppToaster();
  const dispatch = useAppDispatch();
  const { id, typeId } = useParams();
  const document = useAppSelector(documentSelector);
  const [getBlock] = useGetBlocksMutation();
  const [getItems] = useGetThrottlePlateItemsMutation();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          getBlock(Number(id));
          const items = await getItems(Number(id)).unwrap();
          dispatch(setItems({ items }));
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
          showError(message, 'Ошибка');
        }
      }
    };

    fetchData();
  }, [getBlock, getItems, dispatch, id]);

  return (
    <div className="gapb">
      {document?.type.link !== typeId ? <Skeleton className="layout-loader" /> : children}
    </div>
  );
}
