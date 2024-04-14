import { getRandomBetween } from '../helpers/get-random-between.helper';
import { getRandomNumber } from '../helpers/get-random-int.helper';
import { Position } from '../interfaces/position.interface';
import { World } from '../world/world';
import { Entity } from './entity';

export class Wolf extends Entity {
  readonly type = `WOLF`;
  readonly symbol = '🐺';
  static spawnRate = 0.1;

  private hunger: number;
  private maxHunger: number;

  constructor(world: World, position: Position) {
    super(world, position);

    this.hunger = getRandomNumber(3);
    this.maxHunger = getRandomBetween(60, 100);
  }

  act() {
    this.move();

    this.hunger++;
    if (this.hunger > this.maxHunger) {
      console.log(`Wolf ${this.id} died from hunger`);
      this.die();
      return;
    }

    const occupants = this.world.getPos(this.position);

    occupantLoop: for (const occupant of occupants) {
      if (occupant.id == this.id) {
        continue;
      }
      switch (occupant.type) {
        case `SHEEP`:
          console.log(`Wolf ${this.id} ate sheep at ${this.x}, ${this.y}`);
          this.hunger = 0;
          occupant.die();
          break occupantLoop;
        default:
          continue;
      }
    }
  }
}
