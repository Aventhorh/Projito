import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { getDuration } from '../../utils/utils';

import styles from './AudioPlayer.module.css';

interface IAudioPlayerProps {
  readonly source: string;
}

const AudioPlayer: FC<IAudioPlayerProps> = ({ source }) => {
  const [timeLine, setTimeLine] = useState('0');
  const [duration, setDuration] = useState('');
  const [volumeValue, setVolumeValue] = useState('0.4');
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);

  const AudioPlayerRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (AudioPlayerRef.current) {
      const player = AudioPlayerRef.current;
      let duration: number;

      const onLoadedMetaData = () => {
        duration = player.duration;
        setDuration(getDuration(duration, 0));
      };

      const onTimeUpdate = () => {
        const currentTime = player.currentTime;
        const percentagePosition = (100 * currentTime) / duration;
        setTimeLine(percentagePosition.toString());
        setDuration(getDuration(duration, currentTime));
      };

      player.addEventListener('loadedmetadata', onLoadedMetaData);
      player.addEventListener('timeupdate', onTimeUpdate);

      return () => {
        player.removeEventListener('loadedmetadata', onLoadedMetaData);
        player.removeEventListener('timeupdate', onTimeUpdate);
      };
    }
  }, [AudioPlayerRef]);

  const player = AudioPlayerRef.current!;

  const changeTimeLineHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const timeValue = e.target.value;

    player.currentTime = (+timeValue * player.duration) / 100;
    setTimeLine(timeValue);
  };

  const togglePlay = () => {
    player.paused ? player.play() : player.pause();
  };

  const forward = () => {
    player.currentTime += 10;
  };

  const rewind = () => {
    player.currentTime -= 10;
  };

  const changeVolume = (e: ChangeEvent<HTMLInputElement>) => {
    setVolumeValue(e.target.value);
    player.volume = +e.target.value;
  };

  const volumeVisibilityHandler = () => {
    setIsVolumeVisible((prev) => !prev);
  };

  const mutePlayer = () => {
    player.muted = !player.muted;
  };

  return (
    <figure className={styles.player}>
      <div className={styles.container}>
        <audio ref={AudioPlayerRef} src={source} />
        <button
          className={classNames(styles.controls, styles['play-btn'])}
          onClick={togglePlay}
        />
        <button
          className={classNames(styles.controls, styles['rewind-btn'])}
          onClick={rewind}
        />
        <button
          className={classNames(styles.controls, styles['forward-btn'])}
          onClick={forward}
        />
        <input
          className={styles['time-line']}
          type="range"
          max="100"
          value={timeLine}
          onChange={changeTimeLineHandler}
        />
        <span className={styles.duration}>{duration}</span>
        <button
          onClick={mutePlayer}
          onMouseOver={volumeVisibilityHandler}
          className={classNames(styles.controls, styles['volume-btn'])}
        />
        {isVolumeVisible && (
          <input
            type="range"
            min="0"
            max="1"
            step="0.2"
            value={volumeValue}
            onChange={changeVolume}
            onMouseOut={volumeVisibilityHandler}
            className={styles.volume}
          />
        )}
      </div>
      <figcaption className={styles.description}>
        Запись разговора Юры и Вени Аронвальда, 1937 год
      </figcaption>
    </figure>
  );
};

export default AudioPlayer;
