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

    const occupants = this.world.getPos(this.position);

    for (const occupant of occupants) {
      if (occupant.type === 'GRASS') {
        console.log(`Sheep ${this.id} ate grass at ${this.x}, ${this.y}`);
        occupant.die();
      }
    }
  }
}
