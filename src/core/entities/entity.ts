import { UniqueID } from '../value-objects/unique-id.vo';

export class Entity<Props> {
  private readonly id: UniqueID;
  protected readonly _props: Props;

  constructor(props: Props, id?: UniqueID) {
    this.id = id ?? new UniqueID();
    this._props = props;
  }
}
