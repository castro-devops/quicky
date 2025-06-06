import { Entity } from '@/core/entities/entity';
import { IVendorInterfaceProps } from '../types/vendor.interface';
import { UniqueID } from '@/core/value-objects/unique-id.vo';

export class Vendor extends Entity<IVendorInterfaceProps> {
  get name(): string {
    return this._props.name;
  }

  get surname(): string {
    return this._props.surname;
  }

  get birth(): Date {
    return this._props.birth;
  }

  get email(): string {
    return this._props.email;
  }

  get phone(): string {
    return this._props.phone;
  }

  static create(props: IVendorInterfaceProps): Vendor {
    const vendor = new Vendor({ ...props }, new UniqueID());
    return vendor;
  }

  static restore(props: IVendorInterfaceProps, id: UniqueID): Vendor {
    const vendor = new Vendor({ ...props }, id);
    return vendor;
  }
}
