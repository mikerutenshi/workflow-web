import { ObjectType, OmitType } from '@nestjs/graphql';
import { InvTrfDto } from './inv-trf.dto';

@ObjectType()
export class InvTrfSimpleDto extends OmitType(InvTrfDto, ['invTrfItems']) {}
