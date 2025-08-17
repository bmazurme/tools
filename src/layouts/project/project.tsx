import { Outlet } from 'react-router-dom';
import { Text } from '@gravity-ui/uikit';

import Content from '../../components/content/content';

import style from './project.module.css';

export default function Project() {
  return (
    <Content sidebar>
      <div className={style.content}>
        <Text variant="header-1">Project Layout</Text>
        <Outlet />
      </div>
    </Content>
  );
}
