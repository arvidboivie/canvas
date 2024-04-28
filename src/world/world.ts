import { EntityCollection } from '../entities/entity-collection';
import { Entity } from '../interfaces/entity.interface';
import { Position } from '../interfaces/position.interface';
import { Spawner } from './spawner';
import { Tile } from './tile';
import { EntityType } from '../types/entity-types.type';
import { TileFactory } from './tile.factory';

export class World {
  private tileMap: Tile[][] = [];
  private entities: EntityCollection = new EntityCollection();

  constructor(private readonly WIDTH: number, private readonly HEIGHT: number) {
    for (let x = 0; x < this.WIDTH; x++) {
      this.tileMap[x] = [];
      for (let y = 0; y < this.HEIGHT; y++) {
        this.tileMap[x][y] = TileFactory.create(this, { x, y });
      }
    }

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

  tileOnPosition(position: Position): Tile | undefined {
    if (this.isValidCoordinate(position)) {
      return this.tileMap[position.x][position.y];
    }
  }

  existsOnPosition(position: Position, entity: EntityType): boolean {
    return this.entities.existsOnPosition(position, entity);
  }

  getPos(position: Position): Entity[] {
    return this.entities.getByPosition(position);
  }

  isValidCoordinate({ x, y }: Position): boolean {
    if (x < 0 || x >= this.WIDTH || y < 0 || y >= this.HEIGHT) {
      return false;
    }

    return true;
  }
}
