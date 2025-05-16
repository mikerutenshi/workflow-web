import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<number>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (requiredRole === undefined) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().user || null;
    return (
      user &&
      typeof user.role.clearanceLevel === 'number' &&
      user.role.clearanceLevel <= requiredRole
    );
  }
}
