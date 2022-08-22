import { FC } from 'react';

import styles from '../MaterialsCarousel/MaterialsCarousel.module.css';

interface IMaterialsItemsProps {
  readonly children: any;
}

const MaterialsCarouselItem: FC<IMaterialsItemsProps> = ({ children }) => {
  return (
    <div className={`${styles['carousel-item']}`}>
      {children}
    </div>
  );
};

export default MaterialsCarouselItem;
