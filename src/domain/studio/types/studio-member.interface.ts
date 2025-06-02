import { UniqueID } from '@/core/value-objects/unique-id.vo';

export interface IStudioMemberProps {
  studioId: UniqueID;
  userId: UniqueID;
  role: 'owner' | 'admin' | 'viewer' | 'custom';
  permissions?: string[];
  invitedAt: Date;
  joinedAt?: Date;
  status: 'active' | 'pending' | 'suspended';
}
