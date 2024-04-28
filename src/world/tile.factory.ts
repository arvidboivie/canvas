import { Position } from '../interfaces/position.interface';
import { Tile } from './tile';
import { World } from './world';

export class TileFactory {
  static create(world: World, { x, y }: Position): Tile {
    const tile = new Tile(x, y, 'green');
    let blueChance = 0.1;

    if (x > 1 && y > 1) {
      const previousTiles = [
        world.tileOnPosition({ x: x, y: y - 1 }),
        world.tileOnPosition({ x: x - 1, y }),
        world.tileOnPosition({ x: x - 1, y: y - 1 }),
      ].filter((tile): tile is Tile => tile !== undefined);

      if (previousTiles.some((tile) => tile.color === 'blue')) {
        blueChance = 0.3;
      }
    }

    const randomColor = Math.random() < blueChance ? 'blue' : 'green';
    tile.color = randomColor;

    return tile;
  }
}
