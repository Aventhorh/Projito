import { FC } from 'react';
import { useAppSelector } from '../../services/hooks/hooks';

import MaterialCard from '../MaterialCard/MaterialCard';
import MaterialsCarousel from '../MaterialsCarousel/MaterialsCarousel';
import MaterialsCarouselItem from '../MaterialsCarouselItem/MaterialsCarouselItem';

import { materialsSelector } from '../../services/selectors';

import styles from './Materials.module.css';

const Materials: FC = () => {
  const { isLoading, list, error } = useAppSelector(materialsSelector);
  return (
    <section className={styles.materials}>
      <h2 className={styles.title}>Материалы</h2>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className={styles.cards}>
          {list.map(
            ({ id, tag, title, subtitle, description, image, image_alt }) => (
              <li key={id} className={styles.card}>
                <MaterialCard
                  id={id}
                  tag={tag}
                  title={title}
                  subtitle={subtitle}
                  description={description}
                  image={image}
                  image_alt={image_alt}
                />
              </li>
            )
          )}
        </ul>
      )}
      <ul className={styles.cardsCarousel}>
        <MaterialsCarousel>
          {list.map(
            ({ id, tag, title, subtitle, description, image, image_alt }) => (
              <li key={id} className={styles.card}>
                <MaterialsCarouselItem>
                  <MaterialCard
                    id={id}
                    tag={tag}
                    title={title}
                    subtitle={subtitle}
                    description={description}
                    image={image}
                    image_alt={image_alt}
                  />
                </MaterialsCarouselItem>
              </li>
            )
          )}
        </MaterialsCarousel>
      </ul>
    </section>
  );
};

export default Materials;
