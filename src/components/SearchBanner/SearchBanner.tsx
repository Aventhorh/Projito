import { FC } from 'react';
import { useAppSelector } from '../../services/hooks/hooks';

import Button from '../button/button';

import { searchBannerSelector } from '../../services/selectors';

import styles from './SearchBanner.module.css';

const SearchBanner: FC = () => {
  const { isLoading, list, error } = useAppSelector(searchBannerSelector);

  return (
    <section>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        list.length > 0 && (
          <div className={`${styles['banner']}`}>
            <img
              src={list[0].image}
              alt={list[0].image_alt}
              className={`${styles['img']}`}
            />
            <h3 className={`${styles['section-subtitle']}`}>{list[0].title}</h3>
            <p className={`${styles['text']}`}>{list[0].description}</p>
            <div className={`${styles['buttons-wrapper']}`}>
              <Button
                size="rectangle"
                transpanent
                textValue="Перейти к материалу"
              />
              <Button size="rectangle" textValue="Оставить заявку" />
            </div>
          </div>
        )
      )}
    </section>
  );
};

export default SearchBanner;
