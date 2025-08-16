import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Button, Icon } from '@gravity-ui/uikit';
import { FolderOpen, Moon, Sun } from '@gravity-ui/icons';
import NavigationBreadcrumbs from '../NavigationBreadcrumbs';

import type { PropsWithChildren } from 'react';

import style from './content.module.css';

type ContentProps = {
  sidebar?: boolean;
  menu: {
    link: string;
    name: string;
  }[];
};

export default function Content({ children, menu, sidebar }: PropsWithChildren & ContentProps) {
  return (
    <div className={style.page}>
      {sidebar && 
        <div className={style.sidebar}>
          <div className={style.sidebar_content}>
            <Link to="/projects" className={style.logo}>
              <FolderOpen />
            </Link>

            <div className={style.menu}>
              {menu.map(({ link, name }) => <Link key={uuidv4()} to={link}>{name}</Link>)}
            </div>
          </div>
        </div>
      }
      <div className="main">
        <div className={style.header}>
          <div className={style.bar}>
            <div className={style.bread}>
              <div className={style.bread_t}>
                <div className={style.bread_b}><NavigationBreadcrumbs /></div>
              </div>
            </div>


              <div>
                <Button view="normal" size="s" pin="round-clear" selected>
                  <Icon data={Sun} size={16} />
                </Button>
                <Button view="normal" size="s" pin="clear-round">
                  <Icon data={Moon} size={16} />
                </Button>
              </div>
            </div>
          </div>
        <div className={style.board}>
          {children}
        </div>
      </div>
    </div>
  );
}
