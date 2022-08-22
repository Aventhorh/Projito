import { FC, useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import multiCl from 'classnames';

import HeaderMobile from './HeaderMobile';

import cl from './Header.module.css';

const Header: FC = () => {
  const [visible, setVisible] = useState(false);
  const [isMenuBtnVisisble, setIsMenuBtnVisible] = useState(false);

  const location = useLocation();
  const thisPathname = useMemo(() => location.pathname, [location]);

  const resizeHelper = (e: Event) => {
    const target = e.target as Window;
    if (target) {
      if (target.innerWidth < 767) {
        setIsMenuBtnVisible(true);
      } else {
        setIsMenuBtnVisible(false);
        setVisible(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('resize', resizeHelper);

    return () => window.removeEventListener('resize', resizeHelper);
  }, []);

  return (
    <header
      className={multiCl(
        thisPathname === '/' ? cl.header : cl.header__second_page,
        visible ? cl.header_mobile_menu : ''
      )}
    >
      <div className={multiCl(cl.header__container, cl.menu)}>
        <Link
          to={'/'}
          className={multiCl(cl.logo, cl.logo_place_header)}
        ></Link>
        <nav>
          <ul className={cl.menu__desktop}>
            <li className={cl.menu__item}>
              <a
                href="https://prozhito.org/page/archive"
                className={cl.menu__link}
              >
                Архив
              </a>
            </li>
            <li className={cl.menu__item}>
              <a href="https://prozhito.org/persons" className={cl.menu__link}>
                Корпус
              </a>
            </li>
            <li className={cl.menu__item}>
              <a href="#" className={cl.menu__link}>
                О проекте
              </a>
              <ul className={cl.menu__dropdown}>
                <li className={cl.menu__dropdown_item}>
                  <a
                    href="#"
                    className={multiCl(cl.menu__link, cl.menu__link_dropdown)}
                  >
                    О&nbsp;прожито
                  </a>
                </li>
                <li className={cl.menu__dropdown_item}>
                  <a
                    href="#"
                    className={multiCl(cl.menu__link, cl.menu__link_dropdown)}
                  >
                    Как&nbsp;работать?
                  </a>
                </li>
                <li className={cl.menu__dropdown_item}>
                  <a
                    href="#"
                    className={multiCl(cl.menu__link, cl.menu__link_dropdown)}
                  >
                    Медиа
                  </a>
                </li>
                <li className={cl.menu__dropdown_item}>
                  <a
                    href="#"
                    className={multiCl(cl.menu__link, cl.menu__link_dropdown)}
                  >
                    Новости
                  </a>
                </li>
                <li className={cl.menu__dropdown_item}>
                  <a
                    href="#"
                    className={multiCl(cl.menu__link, cl.menu__link_dropdown)}
                  >
                    Спецпроекты
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>

        {visible ? <HeaderMobile /> : null}

        {!isMenuBtnVisisble ? null : visible ? (
          <button
            className={cl.menu__close_button}
            onClick={() => setVisible(false)}
          />
        ) : (
          <button
            className={cl.menu__open_button}
            onClick={() => setVisible(true)}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
