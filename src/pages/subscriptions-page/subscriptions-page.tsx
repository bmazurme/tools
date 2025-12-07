import { Text, Button } from '@gravity-ui/uikit';

import Content from '../../components/content/content';

export default function SubscriptionsPage() {
  return (
    <Content sidebar>
      <div className="content">
        <Text variant="header-1">Подписка</Text>
        <Text variant="body-1">
          Main
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Voluptates asperiores accusamus est, ab rerum harum hic delectus fuga veniam!
          Hic, atque, quia sunt consectetur eius corrupti,
          expedita sapiente exercitationem aperiam quibusdam libero ipsa veritatis quisquam!
        </Text>
        <Button view="outlined-info" size="l">Outlined Info</Button>
        <Button view="outlined-success" size="l">Outlined Success</Button>
        <Button view="outlined-warning" size="l">Outlined Warning</Button>
      </div>
    </Content>
  );
}
