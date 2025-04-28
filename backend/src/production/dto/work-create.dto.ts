import { InputType, OmitType } from '@nestjs/graphql';
import { WorkUpdateDto } from './work-update.dto';

@InputType()
export class WorkCreateDto extends OmitType(WorkUpdateDto, [
  'updatedBy' as const,
]) {}
