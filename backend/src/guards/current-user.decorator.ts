import { User } from '@/models/user.model';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * The authenticated user, attached per-request by the Apollo context factory in
 * app.module.ts. This only reads what the factory put there -- it does not
 * authenticate, so always pair it with AuthGuard or RoleGuard. Guards run before
 * param decorators resolve, so behind a guard the value is non-null.
 *
 * Typed against the GraphQL model rather than the Prisma one: only that shape
 * declares `role` and `userInventories`, which AuthService.me attaches.
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): User =>
    GqlExecutionContext.create(context).getContext().user,
);
