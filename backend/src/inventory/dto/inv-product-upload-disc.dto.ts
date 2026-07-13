import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class InvProductUploadDiscDto {
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  invId!: number;

  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  productId!: number;

  @IsOptional()
  @IsString()
  discounts?: string;
}
