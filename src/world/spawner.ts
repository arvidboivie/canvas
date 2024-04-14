import { Entity } from '../entities/entity';
import { Sheep } from '../entities/sheep';
import { Wolf } from '../entities/wolf';
import { getRandomNumber } from '../helpers/get-random-int.helper';
import { World } from './world';

export class Spawner {
  static entities = [Sheep, Wolf];
  static spawnTicks = 100;

  static spawn(world: World, width: number, height: number): Entity[] {
    const spawnedEntities = [];

    for (const entityType of this.entities) {
      for (let i = 0; i < this.spawnTicks; i++) {
        if (Math.random() < entityType.spawnRate) {
          spawnedEntities.push(
            new entityType(
              world,
              getRandomNumber(width),
              getRandomNumber(height)
            )
          );
        }
      }
    }

    return spawnedEntities;
  }
}
