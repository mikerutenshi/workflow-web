import { InputType, OmitType } from '@nestjs/graphql';
import { UpdateTaskDto } from './updateTask.dto';

@InputType()
export class CreateTaskDto extends OmitType(UpdateTaskDto, [
  'updatedBy' as const,
]) {}
