export interface IRegisterVendorUseCaseRequest {
  name: string;
  surname: string;
  birth: Date;
  email: string;
  phone: string;
  companyName?: string;
  document: string;
  status: 'active' | 'suspended' | 'pending';
  plan: 'free' | 'pro' | 'enterprise';
  planExpiresAt?: Date;
  createdAt: Date;
  updatedAt?: Date;
}
