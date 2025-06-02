import { UniqueID } from '@/core/value-objects/unique-id.vo';

export interface IStudioEntityProps {
  vendorId: UniqueID;
  name: string;
  slug: string;
  applications: string[];
  members: string[];
  createdAt: Date;
  updatedAt: Date;
}
