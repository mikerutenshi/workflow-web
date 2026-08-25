import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const ROLES_ANY_KEY = 'rolesAny';

/** Minimum clearance: this level and anything more privileged (lower number). */
export const Roles = (role: number) => SetMetadata(ROLES_KEY, role);

/**
 * Exact set membership, ignoring the clearance hierarchy. For permissions that
 * are not monotonic in clearance — e.g. stock counting, which Sales (8) does
 * but Field (6) does not, so no `Roles` threshold can express it.
 */
export const RolesAny = (...levels: number[]) =>
  SetMetadata(ROLES_ANY_KEY, levels);
