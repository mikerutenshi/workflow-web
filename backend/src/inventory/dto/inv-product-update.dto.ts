import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { InvProductCreateDto } from './inv-product-create.dto';

@InputType()
export class InvProductUpdateDto extends PartialType(
  OmitType(InvProductCreateDto, ['invId', 'productId']),
) {}
