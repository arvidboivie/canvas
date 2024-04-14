import { randomMove } from '../helpers/random-move.helper';
import { Entity } from './entity';

export class Sheep extends Entity {
  readonly type = `SHEEP`;
  readonly symbol = '🐑';

  act() {
    const targetPos = randomMove(this.position);

    if (this.world.tryGetPos(targetPos)) {
      this.position = randomMove(this.position);
    }
  }
}
