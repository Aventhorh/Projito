import { FC } from 'react';
import multiCl from 'classnames';

import logoVK from '../../images/vk.svg';
import logoTG from '../../images/telegram.svg';

import cl from './Footer.module.css';

const Footer: FC = () => {
  return (
    <footer className={cl.footer}>
      <nav className={cl.footer__links_section}>
        <ul className={cl.footer__links}>
          <li className={cl.footer__links_item}>
            <a href="#" className={cl.footer__link}>
              О команде
            </a>
          </li>
          <li className={cl.footer__links_item}>
            <a href="#" className={cl.footer__link}>
              Благодарности
            </a>
          </li>
          <li className={cl.footer__links_item}>
            <a href="#" className={cl.footer__link}>
              Партнёры
            </a>
          </li>
          <li className={cl.footer__links_item}>
            <a href="#" className={cl.footer__link}>
              FAQ
            </a>
          </li>
          <li className={cl.footer__links_item}>
            <a href="#" className={cl.footer__link}>
              Инструкции
            </a>
          </li>
        </ul>
      </nav>
      <div className={cl.footer__logo_section}>
        <div className={multiCl(cl.logo, cl.logo_place_footer)}></div>
        <nav className={cl.footer__social_networks}>
          <ul className={cl.footer__links_list}>
            <li className={cl.footer__list_item}>
              <a href="https://t.me/prozhito" className={cl.footer__link}>
                <img
                  src={logoTG}
                  className={cl.footer__social_icon}
                  alt="telegram"
                />
                <span className={cl.footer__link_text}>Телеграм</span>
              </a>
            </li>
            <li className={cl.footer__list_item}>
              <a href="https://vk.com/prozhito" className={cl.footer__link}>
                <img src={logoVK} className={cl.footer__social_icon} alt="vk" />
                <span className={cl.footer__link_text}>Вконтакте</span>
              </a>
            </li>
          </ul>
        </nav>
        <nav className={cl.footer__legal_info}>
          <ul className={cl.footer__links_list}>
            <li className={cl.footer__list_item}>
              <a href="#" className={cl.footer__link}>
                Юридическая информация
              </a>
            </li>
            <li className={cl.footer__list_item}>
              <a href="#" className={cl.footer__link}>
                Политика конфиденциальности
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
