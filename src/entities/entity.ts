import { EntityType } from '../types/entity-types.type';
import { Position } from '../interfaces/position.interface';
import { nanoid } from 'nanoid';
import { World } from '../world/world';

export abstract class Entity {
  readonly id: string;
  abstract type: EntityType;
  abstract symbol: string;

  static readonly spawnRate = 0.3;

  public state: 'ALIVE' | 'DEAD';
  protected position: Position;

  get x() {
    return this.position.x;
  }

  get y() {
    return this.position.y;
  }

  constructor(readonly world: World, x: number, y: number) {
    this.id = nanoid(5);
    this.state = 'ALIVE';
    this.position = { x, y };
  }

  abstract act(): void;

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
