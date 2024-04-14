import { randomMove } from '../helpers/random-move.helper';
import { Entity } from './entity';

export class Wolf extends Entity {
  readonly type = `WOLF`;
  readonly symbol = '🐺';

  act() {
    const targetPos = randomMove(this.position);

    if (this.world.tryGetPos(targetPos)) {
      this.position = randomMove(this.position);
    }

    const occupants = this.world.getPos(this.position);

    for (const occupant of occupants) {
      if (occupant.type === 'SHEEP') {
        console.log(`Wolf ${this.id} ate sheep at ${this.x}, ${this.y}`);
        occupant.die();
      }
    }
  }
}
