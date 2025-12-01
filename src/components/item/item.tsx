/* eslint-disable react/require-default-props */
import { useState, type ReactNode } from 'react';
import { Button, Icon } from '@gravity-ui/uikit';
import { Minus, Pencil, Receipt } from '@gravity-ui/icons';

import ConfirmModal from '../confirm-modal/confirm-modal';

import { useDeleteItemMutation } from '../../store';

interface IItemProps {
  children: ReactNode;
  itemId: number;
  editAction: () => void;
  detailAction?: () => void;
}

export default function Item({
  children, itemId, editAction, detailAction,
}: IItemProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteItem] = useDeleteItemMutation();

  const onHandleRemoveItem = async () => {
    await deleteItem(itemId);
  };

  return (
    <>
      { children }
      <div className="item_tools">
        {detailAction
        && (
        <Button
          view="flat"
          size="s"
          title="Детали"
          onClick={detailAction}
        >
          <Icon
            data={Receipt}
            size={18}
          />
        </Button>
        )}
        <Button
          view="flat"
          size="s"
          title="Редактировать строку"
          onClick={editAction}
        >
          <Icon
            data={Pencil}
            size={18}
          />
        </Button>
        <Button
          view="flat"
          size="s"
          onClick={() => setIsConfirmOpen(true)}
          title="Удалить строку"
        >
          <Icon
            data={Minus}
            size={18}
          />
        </Button>
      </div>
      {isConfirmOpen && (
        <ConfirmModal
          open={isConfirmOpen}
          setOpen={setIsConfirmOpen}
          onDelete={onHandleRemoveItem}
          title="Вы действительно хотите удалить строку?"
        />
      )}
    </>
  );
}
