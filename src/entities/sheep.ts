import { Behaviour } from '../types/behaviours.type';
import { EntityType } from '../types/entity-types.type';
import { Entity } from './entity';

export class Sheep extends Entity {
  readonly type = `SHEEP`;
  readonly symbol = '🐑';

  readonly interactions: Record<EntityType, Behaviour> = {
    SHEEP: 'IGNORE',
    WOLF: 'IGNORE',
  };
}
