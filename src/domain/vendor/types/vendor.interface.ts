export interface IVendorInterfaceProps {
  name: string;
  surname: string;
  birth?: Date | null;
  email: string;
  phone: string;
  document?: string;
  status: 'active' | 'suspended' | 'pending';
  createdAt?: Date;
  updatedAt?: Date;
}
