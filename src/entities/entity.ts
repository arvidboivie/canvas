import { EntityType } from '../types/entity-types.type';
import { Position } from '../interfaces/position.interface';
import { Behaviour } from '../types/behaviours.type';
import { nanoid } from 'nanoid';

export abstract class Entity {
  readonly id: string;
  abstract type: EntityType;
  abstract interactions: Record<EntityType, Behaviour>;
  abstract symbol: string;
  protected position: Position;

  get x() {
    return this.position.x;
  }

  get y() {
    return this.position.y;
  }

  move(position: Position) {
    this.position = position;
  }

  constructor(x: number, y: number) {
    this.id = nanoid(5);
    this.position = { x, y };
  }

  draw(ctx: CanvasRenderingContext2D) {
    return (x: number, y: number, size: number) => {
      ctx.fillText(this.symbol, x * size + size / 2, y * size + size / 2);
    };
  }

  getTarget(): Position {
    return {
      x: this.x + Math.round(Math.random() * 2 - 1),
      y: this.y + Math.round(Math.random() * 2 - 1),
    };
  }

  interact(targetEntity: Entity) {
    return this.interactions[targetEntity.type];
  }
}
