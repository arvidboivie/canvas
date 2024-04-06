import { Entity } from '../entities/entity';
import { Sheep } from '../entities/sheep';
import { Wolf } from '../entities/wolf';

export class Tile {
  x: number;
  y: number;
  entities: Entity[] = [];
  color: string = 'green';

  private readonly SPAWN_PROBABILITY = 0.3;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.entities = this.getRandomEntities(1);
  }

  getRandomEntities(count: number): Entity[] {
    const entities: Entity[] = [];

    for (let i = 0; i < count; i++) {
      if (Math.random() < this.SPAWN_PROBABILITY) {
        entities.push(Math.random() > 0.5 ? new Sheep() : new Wolf());
      }
    }

    return entities;
  }

  addEntity(entity: Entity) {
    throw new Error('Method not implemented.');
  }
  removeEntity(entity: Entity) {
    throw new Error('Method not implemented.');
  }

  draw(ctx: CanvasRenderingContext2D) {
    return (size: number) => {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x * size, this.y * size, size, size);

      for (const entity of this.entities) {
        ctx.fillText(
          entity.symbol,
          this.x * size + size / 2,
          this.y * size + size / 2
        );
      }
    };
  }
}
