import { Position } from '../interfaces/position.interface';

export function randomMove(pos: Position): Position {
  return {
    x: pos.x + Math.round(Math.random() * 2 - 1),
    y: pos.y + Math.round(Math.random() * 2 - 1),
  };
}
