import { Entity } from '@/core/entities/entity';
import { IVendorInterfaceProps } from '../types/vendor.interface';
import { UniqueID } from '@/core/value-objects/unique-id.vo';

export class Vendor extends Entity<IVendorInterfaceProps> {
  get name(): string {
    return this._props.name;
  }

  static create(props: IVendorInterfaceProps, id?: UniqueID) {
    const vendor = new Vendor({ ...props }, id);

    return { vendor };
  }
}
