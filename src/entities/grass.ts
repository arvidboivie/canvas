import { randomMove } from '../helpers/random-move.helper';
import { Entity } from './entity';

export class Grass extends Entity {
  readonly type = `GRASS`;
  readonly symbol = '🌱';
  age = 0;

  act(): void {
    this.age++;

    if (this.age == 5) {
      this.world.add(new Grass(this.world, randomMove(this.position)));
    }

    // if (this.age >= 10) {
    //   this.die();
    // }
  }
}
