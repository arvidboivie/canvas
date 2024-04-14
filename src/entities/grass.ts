import { getRandomBetween } from '../helpers/get-random-between.helper';
import { randomMove } from '../helpers/random-move.helper';
import { Position } from '../interfaces/position.interface';
import { World } from '../world/world';
import { Entity } from './entity';

export class Grass extends Entity {
  readonly type = `GRASS`;
  readonly symbol = '🌱';
  static spawnRate = 0.2;

  private growthRate = 3;
  private age = 0;
  private maxAge: number;

  constructor(world: World, position: Position) {
    super(world, position);
    this.maxAge = getRandomBetween(5, 20);
  }

  act(): void {
    this.age++;

    if (this.age % this.growthRate == 0) {
      const newSpot = randomMove(this.position);

      if (
        this.world.isValidCoordinate(newSpot) &&
        !this.world.existsOnPosition(newSpot, this.type)
      ) {
        this.world.add(new Grass(this.world, newSpot));
      }
    }

    if (this.age >= this.maxAge) {
      this.die();
    }
  }
}
