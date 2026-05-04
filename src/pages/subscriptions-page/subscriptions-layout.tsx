import { Text, Button } from '@gravity-ui/uikit';

import useAppToaster from '../../hooks/use-app-toaster';
import { useAppSelector } from '../../hooks';

import { subscriptionIdSelector, usePaymentsMutation, useRenewMutation } from '../../store';

import LayoutWrapper from '../../components/layout-wrapper/layout-wrapper';

export default function SubscriptionsPage() {
  const { showSuccess, showError } = useAppToaster();
  const subId = useAppSelector(subscriptionIdSelector);
  const [sendPay] = usePaymentsMutation();
  const [renew] = useRenewMutation();

  const renewSubscription = async () => {
    try {
      const result = await renew({ id: subId! }).unwrap() as unknown as { endDate: string };
      const date = new Date(result.endDate);
      const localString = date.toLocaleString('ru-RU');
      showSuccess('Подписка успешно продлена', `до ${localString}`);
    } catch (error) {
      showError(`${error}`, 'Ошибка при обновлении статуса');
    }
  };

  return (
    <LayoutWrapper isLoading={false}>
      <div className="content">
        <Text variant="header-1">Подписка</Text>
        <Text variant="body-1">
          Main
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Voluptates asperiores accusamus est, ab rerum harum hic delectus fuga veniam!
          Hic, atque, quia sunt consectetur eius corrupti,
          expedita sapiente exercitationem aperiam quibusdam libero ipsa veritatis quisquam!
        </Text>

        <Button
          view="outlined-info"
          size="l"
          onClick={() => sendPay()}
        >
          Создать подписку
        </Button>

        <Button
          view="outlined-success"
          size="l"
          onClick={renewSubscription}
        >
          Продлить подписку
        </Button>
        <Button view="outlined-warning" size="l">Отменить подписку</Button>
      </div>
    </LayoutWrapper>
  );
}
