import { FC } from 'react';
import { Link } from 'react-router-dom';

import { MONTHS } from '../../utils/constants';
import { numToString } from '../../utils/utils';

import styles from './SpecProjCard.module.css';

interface ISpecProjCardProps {
  readonly createdAt: string,
  readonly title: string;
  readonly description: string;
  readonly image: string;
}

const SpecProjCard: FC<ISpecProjCardProps> = ({
  createdAt,
  title,
  description,
  image,
}) => {
  const date = new Date(createdAt);
  const formatCreatedAt = `${numToString(date.getDate())} ${
    MONTHS[date.getMonth()]
  } ${date.getFullYear()}`;
  return (
    <Link to="sample" className={styles.card}>
      <img className={styles.img} alt="книга" src={image} />
      <div className={`${styles['main-text']}`}>
        <div className={styles.field}>
          <h3 className={styles.subtitle}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
        <p className={styles.date}>{formatCreatedAt}</p>
      </div>
    </Link>
  );
};

export default SpecProjCard;
