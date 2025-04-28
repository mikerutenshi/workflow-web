import { Size } from '@/models/size.model';
import { Field, InputType, OmitType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class SizeCreateDto {
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
