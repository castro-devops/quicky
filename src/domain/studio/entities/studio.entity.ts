import { Entity } from '@/core/entities/entity';
import { IStudioEntityProps } from '../types/studio.interface';
import { UniqueID } from '@/core/value-objects/unique-id.vo';

export class Studio extends Entity<IStudioEntityProps> {
  get name(): string {
    return this._props.name;
  }

  static create(props: IStudioEntityProps, id?: UniqueID) {
    const studio = new Studio({ ...props }, id);

    return {
      studio,
    };
  }
}
