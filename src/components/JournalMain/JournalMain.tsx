import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../services/hooks/hooks';

import Button from '../button/button';
import MagazineCardMain from '../MagazineCardMain/MagazineCardMain';
import Scrollbar from '../Scrollbar/Scrollbar';

import { journalsSelector } from '../../services/selectors';

import styles from './JournalMain.module.css';

const JournalMain: FC = () => {
  const { isLoading, list, error } = useAppSelector(journalsSelector);
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
        <h2 className={styles.title}>Журнал «Прожито»</h2>
        <Link className={styles.link} to="journal">
          <p className={styles.textButton}>Посмотреть всю подборку</p>
          <Button
            type="button"
            transpanent={windowSize.innerWidth < 768 ? true : false}
            size="circle"
          />
        </Link>
      </div>
      {windowSize.innerWidth > 768 ? (
        <Scrollbar title={'Новые материалы'}>
          {isLoading ? (
            <p>Загрузка...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            list.slice(0, 6).map((item) => {
              return <MagazineCardMain key={item.id} data={item} />;
            })
          )}
        </Scrollbar>
      ) : (
        <div className={styles.cardWrap}>
          {isLoading ? (
            <p>Загрузка...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            list.slice(0, 6).map((item, index) => {
              return (
                <MagazineCardMain
                  key={item.id}
                  data={item}
                  index={list.length - index}
                />
              );
            })
          )}
        </div>
      )}
    </section>
  );
};

export default JournalMain;
