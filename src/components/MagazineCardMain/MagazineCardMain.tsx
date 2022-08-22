import { FC } from 'react';
import { TJournalCard } from '../../types/data';

import styles from './MagazineCardMain.module.css';

interface IMagazineCardMainProps {
  readonly data: TJournalCard;
  readonly index?: number;
}

const MagazineCardMain: FC<IMagazineCardMainProps> = (props) => {
  const { data, index } = props;

  switch (data.type) {
    case 'special_project':
      return (
        <article
          className={styles.containerSP}
          style={{
            backgroundImage: `url("${data.image}")`,
            zIndex: `${index}`,
          }}
        >
          <p className={styles.tagSP}>{data.tag}</p>
          <h2 className={styles.titleSP}>{data.title}</h2>
          <p className={styles.subtitleSP}>{data.subtitle}</p>
          <p className={styles.descriptionSP}>{data.description}</p>
        </article>
      );
    case 'experience':
      return (
        <article className={styles.containerExp} style={{ zIndex: `${index}` }}>
          <h2 className={styles.titleExp}>{data.title}</h2>
          <img className={styles.imageExp} src={data.image} alt={data.title} />
          <p className={styles.subtitleExp}>{data.subtitle}</p>
          <p className={styles.tagExp}>{data.tag}</p>
        </article>
      );
    default:
      return <></>;
  }
};

export default MagazineCardMain;
