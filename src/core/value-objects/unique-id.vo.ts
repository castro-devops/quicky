import { randomUUID } from 'crypto';

export class UniqueID {
  private readonly _id: string;

  toString(): string {
    return this._id;
  }

  toValue() {
    return this._id;
  }

  constructor(value?: string) {
    this._id = value ?? randomUUID();
  }
}
