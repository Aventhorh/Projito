import React from 'react';
import { Children, useState } from 'react';
import { FC } from 'react';

import styles from './MaterialsCarousel.module.css';

interface IMaterialsCarouselProps {
  readonly children: any;
}

const MaterialsCarousel: FC<IMaterialsCarouselProps> = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const updateIndex = (newIndex: number) => {
    if (newIndex < 0) {
      newIndex = Children.count(children) - 1;
    } else if (newIndex >= Children.count(children)) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  return (
    <div
      className={`${styles['carousel']}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={`${styles['inner']}`}
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { width: '100%' });
        })}
      </div>
      <div className={`${styles['indicators']}`}>
        {React.Children.map(children, (child, index) => {
          return (
            <button
              className={`${index === activeIndex ? styles['activeBtn'] : ''}`}
              onClick={() => {
                updateIndex(index);
              }}
            >
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MaterialsCarousel;
