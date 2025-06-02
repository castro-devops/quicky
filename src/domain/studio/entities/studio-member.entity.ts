import { Entity } from '@/core/entities/entity';
import { IStudioMemberProps } from '../types/studio-member.interface';
import { UniqueID } from '@/core/value-objects/unique-id.vo';

export class StudioMember extends Entity<IStudioMemberProps> {
  get userId() {
    return this._props.userId;
  }

  get role() {
    return this._props.role;
  }

  get status() {
    return this._props.status;
  }

  static create(props: IStudioMemberProps, id?: UniqueID) {
    const member = new StudioMember({ ...props }, id);

    if (!props.invitedAt) {
      member._props.invitedAt = new Date();
    }

    return { member };
  }
}
