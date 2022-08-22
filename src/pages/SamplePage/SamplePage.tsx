import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';
import multiCl from 'classnames';

import Gallery from '../../components/Gallery/Gallery';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';

import styles from './samplePage.module.css';
import './SamplePage.css';

export const SamplePage = () => {
  const container = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3000/assets/sample/practicum_sample_22_07_12.html')
      .then((res) => setHtml(res.data));
  }, []);

  const options = {
    replace: (domNode: any) => {
      if (domNode.name === 'figure') {
        return <Gallery domNode={domNode} />;
      }
      if (domNode.name === 'audio') {
        return <AudioPlayer source={domNode.attribs.src} />;
      }
    },
  };

  return (
    <main className={styles.typicalPage}>
      <div className={styles.typical}>
        <Breadcrumbs />
        <div className={styles.typicalSubtitle}>
          <p className={styles.typicalSubtitlePart}>детство</p>
          <p className={styles.typicalSubtitlePart}>&#183;</p>
          <p className={styles.typicalSubtitlePart}>опыт читателя</p>
        </div>
      </div>
      <button
        type="button"
        className={multiCl(styles.button, styles.buttonContens)}
      >
        оглавление
      </button>
      <div className="article" ref={container}>
        {parse(html, options)}
      </div>
    </main>
  );
};
