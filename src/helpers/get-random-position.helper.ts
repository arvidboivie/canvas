import { getRandomNumber } from './get-random-int.helper';

export function getRandomPosition(width: number, height: number) {
  return {
    x: getRandomNumber(width),
    y: getRandomNumber(height),
  };
}
