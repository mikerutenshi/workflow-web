import { Progress } from '@/generated/client';
import { InvTx } from '@/models/inv-tx.model';
import { Field, ObjectType, OmitType } from '@nestjs/graphql';

@ObjectType()
export class InvTxDto extends InvTx {
  @Field()
  txNo: string;
  @Field(() => Date)
  txDate: Date;
  @Field(() => Progress)
  progress: Progress;
}
