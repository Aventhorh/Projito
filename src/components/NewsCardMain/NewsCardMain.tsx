import { FC } from 'react';

import { TNews } from '../../types/data';
import { numToString } from '../../utils/utils';

import styles from './NewsCardMain.module.css';

interface INewsCardMainProps {
  readonly data: TNews;
}

const NewsCardMain: FC<INewsCardMainProps> = (props) => {
  const { data } = props;
  const date = new Date(data.createdAt);
  const cardDate = `${numToString(date.getDate())}.${numToString(
    date.getMonth() + 1
  )}.${date.getFullYear()}`;

  return (
    <article className={styles.card}>
      <div className={styles.description}>
        <p className={styles.date}>{cardDate}</p>
        {data.tag !== null && <p className={styles.chapter}>{data.tag}</p>}
      </div>
      <img className={styles.image} src={data.image} alt={data.image_alt} />
      <p className={styles.text}>{data.title}</p>
    </article>
  );
};

export default NewsCardMain;
