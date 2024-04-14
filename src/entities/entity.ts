import { EntityType } from '../types/entity-types.type';
import { Position } from '../interfaces/position.interface';
import { nanoid } from 'nanoid';
import { World } from '../world/world';
import { randomMove } from '../helpers/random-move.helper';

export abstract class Entity {
  readonly id: string;
  abstract type: EntityType;
  abstract symbol: string;

  static readonly spawnRate: number = 0.3;

  public state: 'ALIVE' | 'DEAD';

  get x() {
    return this.position.x;
  }

  get y() {
    return this.position.y;
  }

  constructor(readonly world: World, protected position: Position) {
    this.id = nanoid(5);
    this.state = 'ALIVE';
  }

  abstract act(): void;

  move(): void {
    const targetPos = randomMove(this.position);

    if (
      this.world.isValidCoordinate(targetPos) &&
      !this.world.existsOnPosition(targetPos, this.type)
    ) {
      this.position = targetPos;
    }
  }

  die(): void {
    this.state = 'DEAD';
    this.world.remove(this.id);
  }

  draw(ctx: CanvasRenderingContext2D) {
    return (x: number, y: number, size: number) => {
      ctx.fillText(this.symbol, x * size + size / 2, y * size + size / 2);
    };
  }
}
