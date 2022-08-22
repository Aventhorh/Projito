import { FC } from 'react';
import multiCl from 'classnames';

import cl from './Header.module.css';

const HeaderMobileDrop: FC = () => {
  return (
    <div
      className={multiCl(
        cl.menu__mobile_links_section,
        cl.menu__mobile_links_section_dropdown,
        cl.menu__mobile_links_section_closed
      )}
    >
      <ul className={cl.menu__mobile_links}>
        <li className={cl.menu__item}>
          <a href="#" className={cl.menu__link}>
            О&nbsp;прожито
          </a>
        </li>
        <li className={cl.menu__item}>
          <a href="#" className={cl.menu__link}>
            Как&nbsp;работать?
          </a>
        </li>
        <li className={cl.menu__item}>
          <a href="#" className={cl.menu__link}>
            Медиа
          </a>
        </li>
      </ul>
      <ul className={cl.menu__mobile_links}>
        <li className={cl.menu__item}>
          <a href="#" className={cl.menu__link}>
            Новости
          </a>
        </li>
        <li className={cl.menu__item}>
          <a href="#" className={cl.menu__link}>
            Спецпроекты
          </a>
        </li>
      </ul>
    </div>
  );
};

export default HeaderMobileDrop;
