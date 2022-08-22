import { FC } from 'react';

import styles from './About.module.css';

const About: FC = () => {
  return (
    <section className={styles.about}>
      <p className={styles.text}>
        Центр «Прожито» собирает, описывает и публикует документы личного
        происхождения и разрабатывает исследовательские инструменты для работы
        с ними. Материалы публикуются и описываются силами
        участников-волонтёров, к сообществу которых может присоединиться каждый.
      </p>
    </section>
  );
};

export default About;
