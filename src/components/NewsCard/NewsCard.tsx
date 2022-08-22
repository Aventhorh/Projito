import { FC } from 'react';

import { TNews } from '../../types/data';
import { numToString } from '../../utils/utils';

import styles from './NewsCard.module.css';

const NewsCard: FC<{ card: TNews }> = ({ card }) => {
  const { createdAt, image, image_alt, tag, title } = card;
  const date = new Date(createdAt);
  const cardDate = `${numToString(date.getDate())}.${numToString(
    date.getMonth() + 1
  )}.${date.getFullYear()}`;
  return (
    <div className={styles.card}>
      <div className={styles.description}>
        <p className={styles.date}>{cardDate}</p>
        {tag !== null && <p className={styles.chapter}>{tag}</p>}
      </div>
      <img className={styles.image} src={image} alt={image_alt} />
      <p className={styles.text}>{title}</p>
    </div>
  );
};
export default NewsCard;
