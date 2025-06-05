import { Vendor } from '@/domain/vendor/entities/vendor.entity';
import { IRegisterVendorUseCaseRequest } from './types/register-vendor.interface';

export class RegisterVendorUseCase {
  async execute(props: IRegisterVendorUseCaseRequest) {
    const vendor = new Vendor({
      name: props.name,
      surname: props.surname,
      email: props.email,
      phone: props.phone,
      birth: props.birth,
    });
  }
}
