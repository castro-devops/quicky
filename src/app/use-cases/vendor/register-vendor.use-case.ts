import { Vendor } from '@/domain/vendor/entities/vendor.entity';
import { IRegisterVendorUseCaseRequest } from './types/register-vendor.interface';
import { VendorRepository } from '@/app/repositories/vendor.repository';
import { Either, left, right } from '@/core/errors/either';
import { VendorAlreadyExistsError } from '../errors';
import { CanRegisterVendorPolicy } from './policies/can-register-vendor.policy';
import { BuildVendorError } from '@/domain/vendor/errors';
import { Injectable } from '@nestjs/common';

type IRegisterVendorUseCaseResponse = Either<
  VendorAlreadyExistsError | BuildVendorError,
  { vendor: Vendor }
>;

@Injectable()
export class RegisterVendorUseCase {
  constructor(
    private readonly vendorRepository: VendorRepository,
    private readonly canRegisterPolicy: CanRegisterVendorPolicy,
  ) {}

  async execute({
    name,
    surname,
    birth,
    email,
    phone,
  }: IRegisterVendorUseCaseRequest): Promise<IRegisterVendorUseCaseResponse> {
    const canRegister = await this.canRegisterPolicy.execute(email);

    if (!canRegister) {
      return left(new VendorAlreadyExistsError());
    }

    try {
      const vendor = Vendor.create({ name, surname, email, phone, birth });

      await this.vendorRepository.save(vendor);

      return right({ vendor });
    } catch (err) {
      if (err instanceof BuildVendorError) {
        return left(err);
      }
      throw err;
    }
  }
}
