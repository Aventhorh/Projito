import { FC } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks';

import { sampleBannerSelector } from '../../services/selectors';
import { closeBanner } from '../../services/slices/sampleBannersSlice';

import styles from './SampleBanner.module.css';

const modalRootContainer = document.getElementById('modal-root')!;

const SampleBanner: FC = () => {
  const dispatch = useAppDispatch();
  const { error, isLoading, list } = useAppSelector(sampleBannerSelector);
  const [banner] = list;

  const onClickHandler = () => {
    dispatch(closeBanner());
  };

  if (list.length === 0) return null;

  return createPortal(
    <div className={styles.container}>
      <button
        type="button"
        onClick={onClickHandler}
        className={styles['close-btn']}
      ></button>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Link to="/sample" className={styles.link}>
          <h2 className={styles.title}>{banner.title}</h2>
          <p className={styles.description}>{banner.description}</p>
        </Link>
      )}
    </div>,
    modalRootContainer
  );
};

export default SampleBanner;
