import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateSizeDto {
  @Field()
  @IsNotEmpty()
  eu: string;
  @Field(() => String, { nullable: true })
  @IsOptional()
  us: string | undefined;
  @Field(() => String, { nullable: true })
  @IsOptional()
  uk: string | undefined;
}
