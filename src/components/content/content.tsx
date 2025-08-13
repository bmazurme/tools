import { Link } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

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
          <Link to="/projects" className={style.logo}>
            top
          </Link>
          <div className={style.menu}>
            {menu.map(({ link, name }) => <Link key={uuidv4()} to={link}>{name}</Link>)}
          </div>
        </div>
      }
      {children}
    </div>
  );
}
