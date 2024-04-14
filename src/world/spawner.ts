import { Grass } from '../entities/grass';
import { Sheep } from '../entities/sheep';
import { Wolf } from '../entities/wolf';
import { getRandomPosition } from '../helpers/get-random-position.helper';
import { Entity } from '../interfaces/entity.interface';
import { World } from './world';

export class Spawner {
  static entities = [Sheep, Wolf, Grass];
  static spawnTicks = 100;

  static spawn(world: World, width: number, height: number): Entity[] {
    const spawnedEntities = [];

    for (const entityType of this.entities) {
      for (let i = 0; i < this.spawnTicks; i++) {
        if (Math.random() < entityType.spawnRate) {
          spawnedEntities.push(
            new entityType(world, getRandomPosition(width, height))
          );
        }
      }
    }

    return spawnedEntities;
  }
}
