import { Text } from '@gravity-ui/uikit';

import LayoutWrapper from '../../components/layout-wrapper/layout-wrapper';
// import BrokenComponent from '../../components/broken-component/broken-component';

export default function SettingsLayout() {
  return (
    <LayoutWrapper isLoading={false}>
      <div className="content">
        <Text variant="header-1">
          Настройки
        </Text>
        {/* <BrokenComponent /> */}
      </div>
    </LayoutWrapper>
  );
}
