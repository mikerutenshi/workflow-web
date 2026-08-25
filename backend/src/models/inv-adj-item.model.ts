import { AdjReason } from '@/generated/prisma/client';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Size } from './size.model';

@ObjectType()
export class InvAdjItem {
  @Field(() => ID)
  id!: number;

  @Field(() => ID)
  invAdjId!: number;

  @Field(() => ID)
  productId!: number;

  @Field(() => AdjReason)
  reason!: AdjReason;

  @Field(() => String, { nullable: true })
  note?: string | null;

  @Field(() => [InvAdjItemToSize])
  invAdjItemSizes!: InvAdjItemToSize[];
}

@ObjectType()
export class InvAdjItemToSize {
  @Field(() => ID)
  invAdjItemId!: number;

  @Field(() => ID)
  sizeId!: number;

  @Field()
  systemQty!: number;

  @Field()
  countedQty!: number;

  @Field(() => Size)
  size!: Size;
}
