import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks';

import Button from '../../components/button/button';
import NewsCard from '../../components/NewsCard/NewsCard';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

import { newsSelector } from '../../services/selectors';
import { fetchNews } from '../../services/slices/newsSlice';

import styles from '../NewsJournals.module.css';

export const NewsPage = () => {
  const dispatch = useAppDispatch();
  
  const {
    error,
    isLoading,
    list,
    links: { next },
  } = useAppSelector(newsSelector);

  const downloadNewsHandler = () => {
    if (next) {
      dispatch(fetchNews(next));
    }
  };

  return (
    <section className={styles.section}>
      <Breadcrumbs />
      <h1 className={styles.title}>Новости и события</h1>
      <ul className={styles.cards}>
        {list.length > 0 &&
          list.map((news) => (
            <li key={news.id}>
              <NewsCard card={news} />
            </li>
          ))}
        {isLoading && <p>Загрузка...</p>}
        {error && <p className="error">{error}</p>}
      </ul>
      <div className={styles.button}>
        <Button
          size="rectangle"
          textValue="Загрузить ещё"
          type="button"
          onClick={downloadNewsHandler}
        />
      </div>
    </section>
  );
};
