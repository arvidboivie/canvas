import { Behaviour } from '../types/behaviours.type';
import { EntityType } from '../types/entity-types.type';
import { Entity } from './entity';

export class Wolf extends Entity {
  readonly type = `WOLF`;
  readonly symbol = '🐺';

  interactions: Record<EntityType, Behaviour> = {
    SHEEP: 'EAT',
    WOLF: 'IGNORE',
  };
}
