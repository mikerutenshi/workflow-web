import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES_ANY_KEY, ROLES_KEY } from './roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedRoles = this.reflector.getAllAndOverride<number[]>(
      ROLES_ANY_KEY,
      [context.getHandler(), context.getClass()],
    );
    const requiredRole = this.reflector.getAllAndOverride<number>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (allowedRoles === undefined && requiredRole === undefined) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().user || null;
    if (!user || typeof user.role?.clearanceLevel !== 'number') {
      return false;
    }
    // RolesAny wins when both are present: an explicit set is the more specific
    // statement, and a threshold alongside it could only ever widen the set.
    return allowedRoles !== undefined
      ? allowedRoles.includes(user.role.clearanceLevel)
      : user.role.clearanceLevel <= requiredRole;
  }
}
