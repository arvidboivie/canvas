import { Position } from '../interfaces/position.interface';
import { getRandomNumber } from './get-random-int.helper';

const cardinalDirections: Position[] = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
];

export function randomMove(pos: Position): Position {
  const direction =
    cardinalDirections[getRandomNumber(cardinalDirections.length)];

  return {
    x: pos.x + direction.x,
    y: pos.y + direction.y,
  };
}
