import {
  FC,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import styles from './Scrollbar.module.css';

interface IScrollbarProps {
  readonly title: string;
  readonly children: ReactNode;
}

const Scrollbar: FC<IScrollbarProps> = (props) => {
  const { title, children } = props;
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const scrollThumbRef = useRef<HTMLDivElement>(null);
  const observer = useRef<ResizeObserver | null>(null);
  const [thumbWidth, setThumbWidth] = useState(20);
  const [scrollStartPosition, setScrollStartPosition] = useState(0);
  const [initialScrollLeft, setInitialScrollLeft] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleResize = (ref: HTMLDivElement) => {
    const { clientWidth, scrollWidth } = ref;
    const { clientWidth: trackSize } = scrollTrackRef.current as HTMLDivElement;
    setThumbWidth(Math.max((clientWidth / scrollWidth) * trackSize, 20));
  };

  const handleScrollButton = (direction: 'prev' | 'next') => {
    const { current } = contentRef;
    if (current) {
      const scrollAmount = direction === 'next' ? 350 : -350;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleTrackClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { current: trackCurrent } = scrollTrackRef;
    const { current: contentCurrent } = contentRef;
    if (trackCurrent && contentCurrent) {
      const { clientX } = e;
      const target = e.target as HTMLDivElement;
      const rect = target.getBoundingClientRect();
      const trackLeft = rect.left;
      const thumbOffset = -(thumbWidth / 2);
      const clickRatio =
        (clientX - trackLeft + thumbOffset) / trackCurrent.clientWidth;
      const scrollAmount = Math.floor(clickRatio * contentCurrent.scrollWidth);
      contentCurrent.scrollTo({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleThumbPosition = () => {
    if (
      !contentRef.current ||
      !scrollTrackRef.current ||
      !scrollThumbRef.current
    ) {
      return;
    }
    const { scrollLeft: contentLeft, scrollWidth: contentWidth } =
      contentRef.current;
    const { clientWidth: trackWidth } = scrollTrackRef.current;
    let newLeft = (+contentLeft / +contentWidth) * trackWidth;
    newLeft = Math.min(newLeft, trackWidth - thumbWidth);
    const thumb = scrollThumbRef.current;
    thumb.style.left = `${newLeft}px`;
    setScrollPosition(contentLeft + trackWidth);
  };

  const handleThumbMousedown: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setScrollStartPosition(e.clientX);
    if (contentRef.current) setInitialScrollLeft(contentRef.current.scrollLeft);
    setIsDragging(true);
  };

  const handleThumbMouseup = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (isDragging) {
        setIsDragging(false);
      }
    },
    [isDragging]
  );

  const handleThumbMousemove = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (isDragging && contentRef.current !== null) {
        const {
          scrollWidth: contentScrollWidth,
          offsetWidth: contentOffsetWidth,
        } = contentRef.current;
        const deltaX =
          (e.clientX - scrollStartPosition) * (contentOffsetWidth / thumbWidth);
        const newScrollLeft = Math.min(
          initialScrollLeft + deltaX,
          contentScrollWidth - contentOffsetWidth
        );
        contentRef.current.scrollLeft = newScrollLeft;
      }
    },
    [initialScrollLeft, isDragging, scrollStartPosition, thumbWidth]
  );

  useEffect(() => {
    if (contentRef.current && scrollTrackRef.current) {
      const ref = contentRef.current;
      observer.current = new ResizeObserver(() => {
        handleResize(ref);
        handleThumbPosition();
      });
      observer.current.observe(ref);
      ref.addEventListener('scroll', handleThumbPosition);
      return () => {
        observer.current?.unobserve(ref);
        ref.removeEventListener('scroll', handleThumbPosition);
      };
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleThumbMousemove);
    document.addEventListener('mouseup', handleThumbMouseup);
    document.addEventListener('mouseleave', handleThumbMouseup);
    return () => {
      document.removeEventListener('mousemove', handleThumbMousemove);
      document.removeEventListener('mouseup', handleThumbMouseup);
      document.removeEventListener('mouseleave', handleThumbMouseup);
    };
  }, [handleThumbMousemove, handleThumbMouseup]);

  return (
    <div className={styles.container}>
      <div className={styles.titleWrap}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.btnContainer}>
          <button
            className={`${styles.btn} ${styles.prev}`}
            onClick={() => handleScrollButton('prev')}
            disabled={
              scrollPosition === scrollTrackRef.current?.clientWidth ||
              scrollPosition === 0
                ? true
                : false
            }
          ></button>
          <button
            className={`${styles.btn} ${styles.next}`}
            onClick={() => handleScrollButton('next')}
            disabled={
              scrollPosition === contentRef.current?.scrollWidth ? true : false
            }
          ></button>
        </div>
      </div>
      <div className={styles.content} ref={contentRef}>
        {children}
      </div>
      <div className={styles.trackAndThumb}>
        <div
          className={styles.track}
          ref={scrollTrackRef}
          onClick={handleTrackClick}
        ></div>
        <div
          className={styles.thumb}
          ref={scrollThumbRef}
          onMouseDown={handleThumbMousedown}
          style={{
            width: `${thumbWidth}px`,
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
        ></div>
      </div>
    </div>
  );
};

export default Scrollbar;
