import { Entity } from '../entities/entity';
import { EntityCollection } from '../entities/entity-collection';
import { Position } from '../interfaces/position.interface';
import { Spawner } from './spawner';
import { Tile } from './tile';

export class World {
  private readonly WIDTH = 24;
  private readonly HEIGHT = 16;

  private tileMap: Tile[][] = [];
  private entities: EntityCollection = new EntityCollection();

  populate() {
    this.tileMap = [...Array(this.WIDTH)].map((_valx, x) =>
      [...Array(this.HEIGHT)].map((_valy, y) => new Tile(x, y))
    );

    this.entities.add(Spawner.spawn(this, this.WIDTH, this.HEIGHT));
  }

  update() {
    this.entities.getAll().forEach((entity) => {
      entity.act();
    });
  }

  remove(id: string) {
    this.entities.remove(id);
  }

  add(entity: Entity) {
    this.entities.add([entity]);
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

  getPos(position: Position): Entity[] {
    return this.entities.getByPosition(position);
  }

  tryGetPos({ x, y }: Position): Entity[] | undefined {
    if (x < 0 || x >= this.WIDTH || y < 0 || y >= this.HEIGHT) {
      return;
    }

    return this.entities.getByPosition(x, y);
  }
}
