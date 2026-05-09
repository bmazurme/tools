/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import {
  Button, Card, Icon, Modal, Text,
  TextInput,
  User,
} from '@gravity-ui/uikit';
import { Controller, useForm } from 'react-hook-form';
import { Magnifier, Minus, Plus } from '@gravity-ui/icons';

import { useState } from 'react';
import style from './add-user-modal.module.css';
import { TEXT_INPUT_PROPS } from '../../config';
import { documentSelector, useGetUserByEmailMutation } from '../../store';
import useAppToaster from '../../hooks/use-app-toaster';
import { useAppSelector } from '../../hooks';

type ConfirmModalProps = {
  open: boolean;
  setOpen: (e: boolean) => void;
  title: string;
  isLoading?: boolean;
};

type FormPayload = { email: string };

const fields = [
  {
    name: 'email',
    label: 'Email',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Email is invalid',
    },
    required: 'Обязательно к заполнению',
    autoComplete: 'email',
  },
];

export default function AddUserModal({
  open, setOpen, title, isLoading = false,
}: ConfirmModalProps) {
  const document = useAppSelector(documentSelector);
  const [workers, setWorkers] = useState<UserType | null>(null);
  const [getUserByEmail] = useGetUserByEmailMutation();
  const { showError } = useAppToaster();
  const { control, getValues } = useForm<FormPayload>({
    defaultValues: { email: '' },
  });
  console.log(document);

  const onSubmit = async () => {
    try {
      const { email } = getValues();
      const user = await getUserByEmail(email).unwrap();
      setWorkers(user);
      // console.log(user);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
      showError(`${message}`, 'Ошибка');
    }
  };

  return (
    <Modal open={open} disableOutsideClick>
      <Card theme="normal" size="l" className={style.modal}>
        <Text variant="subheader-3" className={style.title}>{title}</Text>
        <form className="block_header">
          {fields.map((input) => (
            <Controller
              key={input.name}
              name={input.name as keyof FormPayload}
              rules={{
                pattern: input.pattern,
                required: input.required,
              }}
              control={control}
              render={({ field, fieldState }) => (
                <TextInput
                  {...field}
                  {...input}
                  {...TEXT_INPUT_PROPS}
                  error={fieldState.error?.message}
                  // onBlur={onSubmit}
                />
              )}
            />
          ))}
          <Button
            view="flat"
            size="l"
            onClick={onSubmit}
            title="Удалить блок"
            // disabled={isBlockUpdating}
          >
            <Icon
              data={Magnifier}
              size={20}
            />
          </Button>
        </form>
        <div>
          {workers
            && (
            <div className={style.item} key={workers.id}>
              <User
                avatar={{ text: workers.email, theme: 'brand' }}
                name={workers.email}
                description={workers.email}
                size="xs"
              />
              <Button
                view="flat"
                size="l"
                disabled
              >
                <Icon
                  data={true ? Plus : Minus}
                  size={16}
                />
              </Button>
            </div>
            )}
        </div>
        <div className="buttons">
          {/* <Button
            view="action"
            size="l"
            onClick={onDelete}
          >
            Удалить
          </Button> */}
          <Button
            view="flat"
            size="l"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Отмена
          </Button>
        </div>

      </Card>
    </Modal>
  );
}
