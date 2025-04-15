import { Field, ID, InputType, OmitType } from '@nestjs/graphql';
import { UpdateWorkDto } from './updateWork.dto';
import { Type, Transform } from 'class-transformer';
import { IsDate, IsInt, Min, ValidateNested } from 'class-validator';
import { SizeToWorkDto } from './sizeToWork.dto';

@InputType()
export class CreateWorkDto extends OmitType(UpdateWorkDto, [
  'updatedBy' as const,
]) {}
