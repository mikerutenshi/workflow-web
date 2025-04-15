import { InputType, OmitType } from '@nestjs/graphql';
import { UpdateWorkDto } from './updateWork.dto';

@InputType()
export class CreateWorkDto extends OmitType(UpdateWorkDto, [
  'updatedBy' as const,
]) {}
