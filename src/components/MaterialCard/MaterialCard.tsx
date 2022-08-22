import { FC } from 'react';

import styles from './MaterialCard.module.css';

interface IMaterialCard {
  readonly id: number;
  readonly tag: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly image: string;
  readonly image_alt: string;
}

const MaterialCard: FC<IMaterialCard> = ({
  tag,
  title,
  subtitle,
  description,
  image,
  image_alt,
}) => {
  return (
    <a href="typical.html" className={styles.cardLink}>
      <p className={styles.cardTag}>{tag}</p>
      <p className={styles.cardTitle}>
        <span>{title}</span>
        <span>{subtitle}</span>
      </p>
      <img src={image} alt={image_alt} className={styles.cardImage} />
      <div className={styles.descriptionWrapper}>
        <p className={styles.cardText}>{description}</p>
      </div>
    </a>
  );
};

export default MaterialCard;
