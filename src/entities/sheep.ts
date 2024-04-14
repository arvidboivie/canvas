import { getRandomNumber } from '../helpers/get-random-int.helper';
import { randomMove } from '../helpers/random-move.helper';
import { Position } from '../interfaces/position.interface';
import { World } from '../world/world';
import { Entity } from './entity';

export class Sheep extends Entity {
  readonly type = `SHEEP`;
  readonly symbol = '🐑';
  static spawnRate = 0.2;

  public hunger: number;
  public wellFedLimit = 3;
  public canHaveBaby: boolean;

  constructor(world: World, position: Position) {
    super(world, position);

    this.canHaveBaby = false;
    this.hunger = getRandomNumber(3);
  }

  act() {
    this.move();

    this.hunger++;
    if (this.hunger > 25) {
      console.log(`Sheep ${this.id} died from hunger`);
      this.die();
      return;
    }

    const occupants = this.world.getPos(this.position);

    occupantLoop: for (const occupant of occupants) {
      if (occupant.id == this.id) {
        continue;
      }
      switch (occupant.type) {
        case 'GRASS':
          console.log(`Sheep ${this.id} ate grass at ${this.x}, ${this.y}`);
          this.hunger = 0;
          this.canHaveBaby = true;
          occupant.die();
          break occupantLoop;
        case 'SHEEP':
          if (
            this.canHaveBaby &&
            occupant.canHaveBaby &&
            this.hunger <= this.wellFedLimit &&
            occupant.hunger <= this.wellFedLimit
          ) {
            this.canHaveBaby = false;
            const babyPos = randomMove(this.position);

            if (
              this.world.isValidCoordinate(babyPos) &&
              !this.world.existsOnPosition(babyPos, this.type)
            ) {
              console.log(
                `Sheep ${this.id} gave birth at ${this.x}, ${this.y}`
              );
              this.world.add(new Sheep(this.world, babyPos));
            }
          }
          break occupantLoop;
        default:
          continue;
      }
    }
  }
}
