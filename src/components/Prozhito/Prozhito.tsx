import { FC } from 'react';

import ProzhitoCard from '../ProzhitoCard/ProzhitoCard';

import { prozhitoCardData } from '../../utils/prozhitoCardData';

import styles from './Prozhito.module.css';

const Prozhito: FC = () => {
  return (
    <section className={styles.prozhito}>
      <ul className={styles.list}>
        {prozhitoCardData.map(({ id, title, text, linkDescrip }) => (
          <li key={id}>
            <ProzhitoCard title={title} text={text} linkDescrip={linkDescrip} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Prozhito;
