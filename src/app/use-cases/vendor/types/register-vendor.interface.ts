export interface IRegisterVendorUseCaseRequest {
  name: string;
  surname: string;
  birth?: Date;
  email: string;
  phone: string;
  companyName?: string;
  document?: string;
  plan: 'free' | 'pro' | 'enterprise';
  planExpiresAt?: Date;
  updatedAt?: Date;
}
