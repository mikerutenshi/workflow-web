import { InputType, PartialType } from '@nestjs/graphql';
import { ProductGroupCreateDto } from './product-group-create.dto';

// The actor is taken from the authenticated context, never from the payload,
// so a client cannot claim to have acted as someone else.
@InputType()
export class ProductGroupUpdateDto extends PartialType(ProductGroupCreateDto) {}
