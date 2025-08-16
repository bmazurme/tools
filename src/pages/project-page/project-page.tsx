import { Outlet } from 'react-router-dom';
import { Text } from '@gravity-ui/uikit';

import Content from '../../components/content/content';

import { menuDocuments } from '../../mock';

import style from './project-page.module.css';

export default function ProjectPage() {  
  return (
    <Content menu={menuDocuments} sidebar>
      <div className={style.content}>
        <Text variant="header-1">Project Page</Text>
        <Outlet />
      </div>
    </Content>
  );
}
