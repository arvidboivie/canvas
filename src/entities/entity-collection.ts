import { Entity } from '../interfaces/entity.interface';
import { Position } from '../interfaces/position.interface';
import { EntityType } from '../types/entity-types.type';

export class EntityCollection {
  private readonly entities: Map<string, Entity> = new Map<string, Entity>();

  private get entityArray(): Entity[] {
    return [...this.entities.values()];
  }

  constructor() {}

  add(inputEntities: Entity[]) {
    inputEntities.forEach((entity) => {
      this.entities.set(entity.id, entity);
    });
  }

  getAll(): Entity[] {
    return this.entityArray;
  }

  remove(id: string) {
    this.entities.delete(id);
  }

  existsOnPosition(position: Position, type: EntityType): boolean {
    return this.getByPosition(position).some((entity) => entity.type == type);
  }

  getByPosition(position: Position): Entity[];
  getByPosition(x: number, y: number): Entity[];
  getByPosition(x: number | Position, y?: number): Entity[] {
    if (typeof x !== 'number') {
      y = x.y;
      x = x.x;
    }

    return this.entityArray.filter(
      (entity) => entity.x === x && entity.y === y
    );
  }
}
