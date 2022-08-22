import { FC } from 'react';
import { Link } from 'react-router-dom';

import Button from '../button/button';

import styles from './ProzhitoCard.module.css';

export type TPozhitoCardProps = {
  readonly title: string;
  readonly text: string;
  readonly linkDescrip: string;
};

const ProzhitoCard: FC<TPozhitoCardProps> = ({ title, text, linkDescrip }) => {
  return (
    <article className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.text}>{text}</p>
      <div className={styles['link-container']}>
        <p className={styles['link-description']}>{linkDescrip}</p>
        <Link to="sample">
          <Button size="circle" />
        </Link>
      </div>
    </article>
  );
};

export default ProzhitoCard;
