import { Vendor } from '@/domain/vendor/entities/vendor.entity';
import { IRegisterVendorUseCaseRequest } from './types/register-vendor.interface';
import { VendorRepository } from '@/app/repositories/vendor.repository';
import { Either, left, right } from '@/core/errors/either';
import { RegisterVendorError, VendorAlreadyExistsError } from '../errors';
import { CanRegisterVendorPolicy } from './policies/can-register-vendor.policy';
import { BuildVendorError } from '@/domain/vendor/errors';
import { Injectable } from '@nestjs/common';

type IRegisterVendorUseCaseResponse = Either<
  VendorAlreadyExistsError | BuildVendorError | RegisterVendorError,
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
    document,
  }: IRegisterVendorUseCaseRequest): Promise<IRegisterVendorUseCaseResponse> {
    const canRegister = await this.canRegisterPolicy.execute(email);

    if (!canRegister) {
      return left(new VendorAlreadyExistsError());
    }

    try {
      const vendor = Vendor.create({
        name,
        surname,
        email,
        phone,
        birth,
        document,
        status: 'pending',
      });

      const saved = await this.vendorRepository.save(vendor);

      if (!saved) {
        return left(new RegisterVendorError());
      }

      return right({ vendor: saved });
    } catch (err) {
      if (err instanceof BuildVendorError) {
        return left(err);
      }
      throw err;
    }
  }
}
