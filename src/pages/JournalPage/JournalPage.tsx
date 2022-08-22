import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks';
import classNames from 'classnames';

import Button from '../../components/button/button';
import MagazineCardMain from '../../components/MagazineCardMain/MagazineCardMain';
import journal from './JournalPage.module.css';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

import { journalsSelector } from '../../services/selectors';
import { fetchJournals } from '../../services/slices/journalSlice';

import styles from '../NewsJournals.module.css';

export const JournalPage = () => {
  const dispatch = useAppDispatch();
  const {
    error,
    isLoading,
    list,
    links: { next },
  } = useAppSelector(journalsSelector);

  const downloadNewsHandler = () => {
    if (next) {
      dispatch(fetchJournals(next));
    }
  };

  return (
    <section className={styles.section}>
      <Breadcrumbs />
      <h1 className={styles.title}>Журнал «Прожито»</h1>
      <p className={journal.text}>Сортировать :</p>
      <ul className={journal.list}>
        <li className={classNames(journal.item, journal.active)}>ВСЕ</li>
        <li className={journal.item}>ТЕМАТИЧЕСКАЯ ПОДБОРКА</li>
        <li className={journal.item}>СПЕЦПРОЕКТЫ</li>
        <li className={journal.item}>ОПЫТ ЧИТАТЕЛЯ</li>
      </ul>
      <ul className={classNames(styles.cards, journal.cards)}>
        {list.length > 0 &&
          list.map((news) => (
            <li key={news.id} className={journal.item}>
              <MagazineCardMain key={news.id} data={news} />
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
