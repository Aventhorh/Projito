import { FC, MouseEventHandler } from 'react';

import arrowRightIntro from './images/arrow_right_intro.svg';

import styles from './button.module.css';

interface IButtonProps {
  readonly size: 'circle' | 'rectangle';
  readonly transpanent?: boolean;
  readonly type?: 'button' | 'submit' | 'reset';
  readonly onClick?: MouseEventHandler<HTMLButtonElement>;
  readonly textValue?: string;
  readonly disabled?: boolean;
}

const Button: FC<IButtonProps> = (props) => {
  const { size, transpanent, type, onClick, textValue, disabled } = props;
  let className = '';

  switch (size) {
    case 'circle': {
      className = transpanent
        ? `${styles.button} ${styles.circle} ${styles.circTransparent}`
        : `${styles.button} ${styles.circle}`;
      break;
    }
    case 'rectangle': {
      className = transpanent
        ? `${styles.button} ${styles.rectTransparent}`
        : `${styles.button}`;
      break;
    }
    default:
      className = '';
  }

  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {textValue && size !== 'circle' ? (
        <p className={styles.text}>{textValue}</p>
      ) : (
        <></>
      )}
      <img
        className={
          size === 'circle' ? styles.arrowCircle : styles.arrowRectangle
        }
        src={arrowRightIntro}
        alt="Стрелка вправо"
      />
    </button>
  );
};

export default Button;
