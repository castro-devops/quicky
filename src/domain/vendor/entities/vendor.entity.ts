import { Entity } from '@/core/entities/entity';
import { IVendorInterfaceProps } from '../types/vendor.interface';
import { UniqueID } from '@/core/value-objects/unique-id.vo';
import { BuildVendorError } from '../errors';
import { requiredFields } from '@/core/utils/required-field.util';
import dayjs from '@/core/config/dayjs.config';

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

  get companyName(): string | undefined {
    return this._props.companyName;
  }

  get document(): string {
    return this._props.document;
  }

  get status(): 'active' | 'suspended' | 'pending' {
    return this._props.status;
  }

  get plan(): 'free' | 'pro' | 'enterprise' {
    return this._props.plan;
  }

  get planExpiresAt(): Date | undefined {
    return this._props.planExpiresAt;
  }

  get updatedAt(): Date | undefined {
    return this._props.updatedAt;
  }

  static create(props: IVendorInterfaceProps): Vendor {
    requiredFields<IVendorInterfaceProps>(
      {
        name: 'Por favor, informe seu nome completo.',
        surname: 'Por favor, informe seu sobrenome.',
        email:
          'O e-mail é obrigatório para que possamos entrar em contato com você.',
        phone: 'Um número de telefone é necessário para contato.',
        document:
          'Um documento de identificação é obrigatório para o registro.',
        status: 'Não conseguimos estabelecer o status inicial da sua conta.',
        createdAt: 'Não conseguimos definir a data de criação da sua conta.',
        plan: 'É necessário escolher um plano. Que tal iniciar com nosso plano gratuito?',
        planExpiresAt:
          'Não conseguimos estabelecer a data de expiração do seu plano. Tente novamente.',
      },
      props,
      {
        general: BuildVendorError,
      },
    );

    const vendor = new Vendor(
      { ...props, createdAt: props.createdAt ?? dayjs().toDate() },
      new UniqueID(),
    );
    return vendor;
  }

  static restore(props: IVendorInterfaceProps, id: UniqueID): Vendor {
    const vendor = new Vendor({ ...props }, id);
    return vendor;
  }
}
