import { Entity } from '../entities/entity';
import { Tile } from './tile';

export class World {
  private readonly WIDTH = 24;
  private readonly HEIGHT = 16;

  private map: Tile[][] = [];

  populate() {
    this.map = [...Array(this.WIDTH)].map((_valx, x) =>
      [...Array(this.HEIGHT)].map((_valy, y) => new Tile(x, y))
    );
  }

  update() {
    for (let x = 0; x < this.WIDTH; x++) {
      for (let y = 0; y < this.HEIGHT; y++) {
        // this.map[x][y].update();
      }
    }
  }

  moveEntity(entity: Entity, fromTile: Tile, toTile: Tile) {
    fromTile.removeEntity(entity);
    toTile.addEntity(entity);
  }

  getPos(x: number, y: number): Tile {
    return this.map[x][y];
  }

  tryGetPos(x: number, y: number): Tile | undefined {
    if (x < 0 || x >= this.WIDTH || y < 0 || y >= this.HEIGHT) {
      return;
    }

    return this.map[x][y];
  }
}
