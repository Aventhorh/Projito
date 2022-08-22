import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import classNames from 'classnames';

import styles from './Breadcrumbs.module.css';

const routes = [
  { path: '/', breadcrumb: 'Главная страница' },
  { path: '/journal', breadcrumb: 'Журнал «Прожито»' },
  { path: '/news', breadcrumb: 'Новости' },
  { path: '/sample', breadcrumb: 'Опыт прочтения одного дневника' },
];

const Breadcrumbs: FC = () => {
  const breadcrumbs = useBreadcrumbs(routes);

  return (
    <nav>
      <ul className={classNames('list', styles.navlist)}>
        {breadcrumbs.map(({ match, breadcrumb }, index, array) => (
          <li key={match.pathname}>
            {index !== array.length - 1 ? (
              <NavLink to={match.pathname} className={styles.navlink}>
                {breadcrumb}
                {' /'}
              </NavLink>
            ) : (
              breadcrumb
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
