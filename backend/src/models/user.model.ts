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
  @Field()
  lastName: string;
  @Field()
  isActive: boolean;
  @Field(() => Role)
  role: Role;

  @Field(() => Date, { nullable: true })
  approvedAt: Date | null;
  @Field(() => ID, { nullable: true })
  approvedBy: string | null;
  @Field(() => Date)
  createdAt: Date;
  @Field(() => ID, { nullable: true })
  createdBy: string | null;
  @Field(() => Date)
  updatedAt: Date;
  @Field(() => ID, { nullable: true })
  updatedBy: string | null;
}
