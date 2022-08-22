import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../services/hooks/hooks';

import Button from '../button/button';
import NewsCardMain from '../NewsCardMain/NewsCardMain';
import Scrollbar from '../Scrollbar/Scrollbar';

import { newsSelector } from '../../services/selectors';

import styles from './NewsMain.module.css';

const NewsMain: FC = () => {
  const { isLoading, list, error } = useAppSelector(newsSelector);

  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  };
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    const handleWindowResize = () => setWindowSize(getWindowSize());
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.chapter}>
        <h2 className={styles.title}>Новости и события</h2>
        <Link className={styles.link} to="news">
          <p className={styles.textButton}>Ко всем новостям</p>
          <Button
            type="button"
            transpanent={windowSize.innerWidth < 768 ? true : false}
            size="circle"
          />
        </Link>
      </div>
      <Scrollbar title={'Свежее'}>
        {isLoading ? (
          <p>Загрузка...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          list.slice(0, 6).map((item) => {
            return <NewsCardMain key={item.id} data={item} />;
          })
        )}
      </Scrollbar>
    </section>
  );
};

export default NewsMain;
