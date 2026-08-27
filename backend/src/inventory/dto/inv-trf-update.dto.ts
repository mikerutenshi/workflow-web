import { InputType, PartialType } from '@nestjs/graphql';
import { InvTrfCreateDto } from './inv-trf-create.dto';

// The actor is taken from the authenticated context, never from the payload,
// so a client cannot claim to have acted as someone else. InvTrfCreateDto no
// longer carries createdBy, so this no longer needs to omit it.
@InputType()
export class InvTrfUpdateDto extends PartialType(InvTrfCreateDto) {
  // @Field(() => [ID])
  // @Transform(({ value }) => {
  //   if (Array.isArray(value)) {
  //     return value.map((v) => parseInt(v, 10));
  //   }
  //   return [];
  // })
  // @IsInt({ each: true })
  // @Min(1, { each: true })
  // invTrfItemIds!: number[];
}
