/**
 * User account that is managed by Apollo locally.
 */
export interface LocalUserAccount {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  avatarFileId: string;
  gravatarEmail: string;
  roles: { tenantId: string; permissions: string[] }[];
}
