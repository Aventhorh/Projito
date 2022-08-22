import { FC } from 'react';
import { useAppSelector } from '../../services/hooks/hooks';

import SpecProjCard from '../SpecProjCard/SpecProjCard';
import Button from '../button/button';

import { specialProjectsSelector } from '../../services/selectors';

import styles from './SpecProjects.module.css';

const SpecProjects: FC = () => {
  const { isLoading, list, error } = useAppSelector(specialProjectsSelector);
  return (
    <section className={`${styles['special-projects']}`}>
      <div className={`${styles['title-container']}`}>
        <h2 className={`${styles['section-title']}`}>Спецпроекты</h2>
      </div>
      <ul className={styles.list}>
        {isLoading ? (
          <p>Загрузка...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          list.map(({ id, createdAt, title, description, image }) => (
            <li key={id} className={styles.card}>
              <SpecProjCard
                createdAt={createdAt}
                title={title}
                description={description}
                image={image}
              />
            </li>
          ))
        )}
      </ul>
      <div className={styles.btn}>
        <Button size="rectangle" textValue="Все спецпроекты" />
      </div>
    </section>
  );
};

export default SpecProjects;
