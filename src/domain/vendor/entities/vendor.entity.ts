import { Entity } from '@/core/entities/entity';
import { IVendorInterfaceProps } from '../types/vendor.interface';
import { UniqueID } from '@/core/value-objects/unique-id.vo';
import { BuildVendorError } from '../errors';
import { requiredFields } from '@/core/utils/required-field.util';
import dayjs from '@/core/configs/dayjs.config';

export class Vendor extends Entity<IVendorInterfaceProps> {
  get name(): string {
    return this._props.name;
  }

  get surname(): string {
    return this._props.surname;
  }

  get birth(): Date | null | undefined {
    return this._props.birth;
  }

  get email(): string {
    return this._props.email;
  }

  get phone(): string {
    return this._props.phone;
  }

  get document(): string | undefined {
    return this._props.document;
  }

  get status(): 'active' | 'suspended' | 'pending' {
    return this._props.status;
  }

  get updatedAt(): Date | undefined {
    return this._props.updatedAt;
  }

  get createdAt(): Date | undefined {
    return this._props.createdAt;
  }

  static create(props: IVendorInterfaceProps): Vendor {
    requiredFields<IVendorInterfaceProps>(
      {
        name: 'Por favor, informe seu nome completo.',
        surname: 'Por favor, informe seu sobrenome.',
        email:
          'O e-mail é obrigatório para que possamos entrar em contato com você.',
        phone: 'Um número de telefone é necessário para contato.',
        status: 'Não conseguimos estabelecer o status inicial da sua conta.',
      },
      props,
      {
        general: BuildVendorError,
      },
    );

    const vendor = new Vendor(
      {
        ...props,
        createdAt: props.createdAt ?? dayjs().toDate(),
      },
      new UniqueID(),
    );
    return vendor;
  }

  static restore(props: IVendorInterfaceProps, id: UniqueID): Vendor {
    const vendor = new Vendor({ ...props }, id);
    return vendor;
  }
}
