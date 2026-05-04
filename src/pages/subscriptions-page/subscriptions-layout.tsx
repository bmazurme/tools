import { Text, Button } from '@gravity-ui/uikit';

import useAppToaster from '../../hooks/use-app-toaster';
import useUser from '../../hooks/use-user';

import { usePaymentsMutation, useRenewMutation } from '../../store';

import LayoutWrapper from '../../components/layout-wrapper/layout-wrapper';

export default function SubscriptionsLayout() {
  const { user } = useUser();
  const { showSuccess, showError } = useAppToaster();
  const [sendPay] = usePaymentsMutation();
  const [renew] = useRenewMutation();

  const renewSubscription = async () => {
    try {
      const id = user!.subscription!;
      const result = await renew({ id }).unwrap() as unknown as { endDate: string };
      const date = new Date(result.endDate);
      const localString = date.toLocaleString('ru-RU');
      showSuccess('Подписка успешно продлена', `до ${localString}`);
    } catch (error) {
      showError(`${error}`, 'Ошибка при продлении подписки');
    }
  };
  const createSubscription = async () => {
    try {
      // const result = 
      await sendPay().unwrap() as unknown as { id: number| null, endDate: string };
      showSuccess('Подписка успешно создана');
    } catch (error) {
      showError(`${error}`, 'Ошибка при создании подписки');
    }
  };

  return (
    <LayoutWrapper isLoading={false}>
      <div className="content">
        <Text variant="header-1">Подписка</Text>

        <Button
          view="outlined-info"
          size="l"
          disabled={!!user?.subscription}
          onClick={createSubscription}
        >
          Создать подписку
        </Button>

        <Button
          view="outlined-success"
          size="l"
          disabled={!user?.subscription}
          onClick={renewSubscription}
        >
          Продлить подписку
        </Button>
        <Button view="outlined-warning" size="l">Отменить подписку</Button>
      </div>
    </LayoutWrapper>
  );
}
