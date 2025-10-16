import { InputType, PartialType } from '@nestjs/graphql';
import { InventoryCreateDto } from './inventory-create.dto';

@InputType()
export class InventoryUpdateDto extends PartialType(InventoryCreateDto) {}
