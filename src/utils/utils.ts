import { TLinkHeaderObject } from '../services/thunks/thunks';

export const parseLinkHeader: (s: string) => TLinkHeaderObject = (linkHeader) => {
  const linkHeadersArray =
    linkHeader
      .split(', ')
      .map(header => header.split('; '));
  
  const linkHeadersMap = linkHeadersArray.map(header => {
    const headerRel =
      header[1]
        .replace(/"/g, '')
        .replace("rel=", '');

    const headerUrl = header[0].slice(1, -1);

    return [headerRel, headerUrl];
  });

  return Object.fromEntries(linkHeadersMap);
}

export function numToString(n: number) {
  return n.toString().padStart(2, '0');
}

export function getDuration(duration: number, currentTime: number) {
  const time = duration - currentTime;
  const hours = Math.floor(time / 60 / 60);
  const minutes = Math.floor(time / 60) - (hours * 60);
  const seconds = Math.floor(time % 60);

  const formattedDuration = [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0')
  ].join(':');

  return formattedDuration;
}
