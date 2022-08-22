import { FC, useState } from 'react';
import multiCl from 'classnames';

import HeaderMobileDrop from './HeaderMobileDrop';

import cl from './Header.module.css';

const HeaderMobile: FC = () => {
  const [visible, setVisible] = useState(false);

  const visibleController = () => {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  return (
    <nav className={cl.menu__mobile}>
      <div className={cl.menu__mobile_links_section}>
        <ul className={cl.menu__mobile_links}>
          <li className={cl.menu__item}>
            <a href="#" className={cl.menu__link}>
              Архив
            </a>
          </li>
          <li className={cl.menu__item}>
            <a href="#" className={cl.menu__link}>
              Корпус
            </a>
          </li>
          <li className={cl.menu__item}>
            <a
              href="#"
              className={multiCl(cl.menu__link, cl.menu__link_open_submenu)}
              onClick={() => visibleController()}
            >
              О проекте
            </a>
          </li>
        </ul>
      </div>
      {visible ? <HeaderMobileDrop /> : null}
    </nav>
  );
};

export default HeaderMobile;
