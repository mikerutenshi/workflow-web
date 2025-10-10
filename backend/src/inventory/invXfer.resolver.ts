import { InvXfer } from '@/models/inv-xfer.model';
import { Resolver, Mutation, Args, Query, ID } from '@nestjs/graphql';
import { InvXferService } from './invXfer.service';

@Resolver(() => InvXfer)
export class InvXferResolver {
  constructor(private service: InvXferService) {}
}
