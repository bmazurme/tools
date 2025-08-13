import { Outlet } from 'react-router';

import Content from '../../components/content/content';

import style from './project-page.module.css';

export default function ProjectPage() {
  const menu = [
    {
      link: 'document/add',
      name: 'Document add',
    },
    {
      link: 'document/rain-roof/1',
      name: 'Document 1',
    },
    {
      link: 'document/rain-roof/2',
      name: 'Document 2',
    },
    {
      link: 'document/rain-runoff/3',
      name: 'Document 3',
    },
  ];

  return (
    <Content menu={menu} sidebar>
      <div className={style.content}>
        <h2 className={style.title}>
          ProjectPage [edit] [delete]
        </h2>
        <Outlet />
      </div>
    </Content>
  );
}
