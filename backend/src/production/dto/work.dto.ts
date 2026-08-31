import { SizeToWork } from '@/models/size-to-work.model';
import { Tag } from '@/models/tag.model';
import { Work } from '@/models/work.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class WorkDto extends Work {
  @Field(() => [SizeToWork])
  workSizes!: SizeToWork[];

  @Field(() => [Tag])
  tags!: Tag[];
}
