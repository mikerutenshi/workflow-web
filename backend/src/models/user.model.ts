import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Role } from './role.model';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;
  @Field()
  email: string;
  @Field()
  firstName: string;
  @Field(() => String, { nullable: true })
  lastName: string | null;
  @Field()
  isActive: boolean;
  @Field(() => Role)
  role: Role;

  @Field(() => Date, { nullable: true })
  approvedAt: Date | null;
  @Field(() => ID, { nullable: true })
  approvedBy: number | null;
  @Field(() => Date)
  createdAt: Date;
  @Field(() => ID, { nullable: true })
  createdBy: number | null;
  @Field(() => Date)
  updatedAt: Date;
  @Field(() => ID, { nullable: true })
  updatedBy: number | null;
}
