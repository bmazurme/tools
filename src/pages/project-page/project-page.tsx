import { Outlet } from 'react-router';
import { useState } from 'react';
import { Button, Card, Modal, Text } from '@gravity-ui/uikit';

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
  
  const [open, setOpen] = useState(false);

  return (
    <Content menu={menu} sidebar>
      <div className={style.content}>
        <h2 className={style.title}>
          ProjectPage
        </h2>
        <div>
          <Button
            onClick={() => setOpen(true)}
          >
            Редактировать
          </Button>
          <Button
            onClick={() => setOpen(true)}
          >
            Удалить
          </Button>

        </div>

        <Modal open={open} onClose={() => setOpen(false)}>
          <Card style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} theme="normal" size="l">
            <Text variant="body-1">Вы действительно хотите удалить проект?</Text>
            <Button view="action" size="l">Нет</Button>
            <Button view="normal" size="l">Да</Button>
          </Card>
        </Modal>
        <Outlet />
      </div>
    </Content>
  );
}
