import { InventoryCreateDto } from './inventory-create.dto';
import { InputType, PartialType, PickType } from '@nestjs/graphql';

@InputType()
export class InventoryUpdateDto extends PartialType(InventoryCreateDto) {}
