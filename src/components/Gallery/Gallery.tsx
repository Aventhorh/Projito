import { FC, useState } from 'react';

import styles from './Gallery.module.css';

interface IGalleryProps {
  readonly domNode: any;
}

const Gallery: FC<IGalleryProps> = (props) => {
  const { domNode } = props;
  const [index, setIndex] = useState(0);
  const images: string[] = [];
  const alts: string[] = [];
  const captions: string[] = [];

  domNode.children.forEach((item: any) => {
    if (item.name === 'img') {
      images.push(item.attribs.src);
      alts.push(item.attribs.alt);
    }

    if (item.name === 'figcaption') {
      captions.push(item.children[0].data);
    }
  });

  const prevHandle = () => {
    if (index !== 0) {
      setIndex(index - 1);
    }
  };

  const nextHandle = () => {
    if (index < images.length - 1) {
      setIndex(index + 1);
    }
  };

  return (
    <section className={`gallery ${styles.container}`}>
      <figure className={styles.imageWrap}>
        <img className={styles.image} src={images[index]} alt={alts[index]} />
      </figure>
      <div className={styles.captionWrap}>
        <figcaption className={styles.caption}>{captions[index]}</figcaption>
        {images.length === 1 ? (
          <></>
        ) : (
          <div className={styles.controlWrap}>
            <button
              className={styles.prevBtn}
              type="button"
              onClick={prevHandle}
              disabled={index === 0 ? true : false}
            ></button>
            <p className={styles.countImage}>
              {index + 1} / {images.length}
            </p>
            <button
              className={styles.nextBtn}
              type="button"
              onClick={nextHandle}
              disabled={index === images.length - 1 ? true : false}
            ></button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
