import {
  Button, Card, Modal, Text,
} from '@gravity-ui/uikit';

import style from './confirm-modal.module.css';

type ConfirmModalProps = {
  open: boolean;
  setOpen: (e: boolean) => void;
  onDelete: () => void;
  title: string;
};

export default function ConfirmModal({
  open, setOpen, onDelete, title,
}: ConfirmModalProps) {
  return (
    <Modal open={open} disableOutsideClick>
      <Card theme="normal" size="l" className={style.modal}>
        <Text variant="subheader-3" className={style.title}>{title}</Text>
        <div className="buttons">
          <Button view="action" size="l" onClick={onDelete}>Удалить</Button>
          <Button view="flat" size="l" onClick={() => setOpen(false)}>Отмена</Button>
        </div>
      </Card>
    </Modal>
  );
}
