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

  @Field()
  createdAt: Date;

  @Field()
  approvedAt?: Date | null;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  createdBy?: number | null;

  @Field({ nullable: true })
  approvedBy?: number | null;

  @Field()
  roleId: number;

  @Field(() => [User], { nullable: 'itemsAndList' })
  createdUsers?: User[] | null;

  @Field(() => [User], { nullable: 'itemsAndList' })
  approvedUsers?: User[] | null;
}
