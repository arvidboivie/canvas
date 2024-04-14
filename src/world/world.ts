import { Entity } from '../entities/entity';
import { EntityCollection } from '../entities/entity-collection';
import { Sheep } from '../entities/sheep';
import { Wolf } from '../entities/wolf';
import { Behaviour } from '../types/behaviours.type';
import { Tile } from './tile';

export class World {
  private readonly WIDTH = 24;
  private readonly HEIGHT = 16;
  private readonly SPAWN_PROBABILITY = 0.1;

  private tileMap: Tile[][] = [];
  private entities: EntityCollection = new EntityCollection();

  populate() {
    this.tileMap = [...Array(this.WIDTH)].map((_valx, x) =>
      [...Array(this.HEIGHT)].map((_valy, y) => new Tile(x, y))
    );

    for (let x = 0; x < this.WIDTH; x++) {
      for (let y = 0; y < this.HEIGHT; y++) {
        if (Math.random() < this.SPAWN_PROBABILITY) {
          this.entities.add([
            Math.random() > 0.5 ? new Sheep(x, y) : new Wolf(x, y),
          ]);
        }
      }
    }
  }

  update() {
    this.entities.getAll().forEach((entity) => {
      const targetPos = entity.getTarget();
      const entitiesAtTargetPos = this.entities.getByPosition(targetPos);
      const behaviourMap = new Map<string, Behaviour>();

      if (entitiesAtTargetPos.length !== 0) {
        for (let i = 0; i < entitiesAtTargetPos.length; i++) {
          behaviourMap.set(
            entitiesAtTargetPos[i].id,
            entity.interact(entitiesAtTargetPos[i])
          );
        }
      }

      for (const [id, behaviour] of behaviourMap) {
        if (behaviour === 'EAT') {
          this.entities.remove(id);
          console.log(
            `${entity.id} ${behaviour} ${id} at ${targetPos.x}, ${targetPos.y}`
          );
        }
      }

      if (this.tryGetPos(targetPos.x, targetPos.y) !== undefined) {
        entity.move(targetPos);
      }
    });
  }

  draw(ctx: CanvasRenderingContext2D, tileSize: number) {
    for (let x = 0; x < this.WIDTH; x++) {
      for (let y = 0; y < this.HEIGHT; y++) {
        this.tileMap[x][y].draw(ctx)(tileSize);
        this.entities
          .getByPosition(x, y)
          .forEach((entity) => entity.draw(ctx)(x, y, tileSize));
      }
    }
  }

  getPos(x: number, y: number): Entity[] {
    return this.entities.getByPosition(x, y);
  }

  tryGetPos(x: number, y: number): Entity[] | undefined {
    if (x < 0 || x >= this.WIDTH || y < 0 || y >= this.HEIGHT) {
      return;
    }

    return this.entities.getByPosition(x, y);
  }
}
