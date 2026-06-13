import { useEffect, type ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@gravity-ui/uikit';

import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

import {
  useGetBlocksMutation, documentSelector, setItems,
} from '../store';
import { useAppDispatch, useAppSelector } from '../hooks';
import useAppToaster from '../hooks/use-app-toaster';

interface WrapperProps {
  children: ReactNode;
  getItems: (id: number) => Promise<{
    data?: ItemType[];
    error?: FetchBaseQueryError | SerializedError | null;
  }>;
}

export default function Wrapper({ children, getItems }: WrapperProps) {
  const { showError } = useAppToaster();
  const dispatch = useAppDispatch();
  const { id, typeId } = useParams();
  const document = useAppSelector(documentSelector);
  const [getBlock] = useGetBlocksMutation();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          getBlock(Number(id));
          const result = await getItems(Number(id));

          if (result.error) {
            throw new Error('Failed to fetch items');
          }

          const items = result.data || [];
          dispatch(setItems({ items }));
        } catch (error) {
          showError(error, 'Ошибка');
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
