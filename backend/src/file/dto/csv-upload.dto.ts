import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import GraphQLUpload, { FileUpload } from 'graphql-upload/GraphQLUpload.mjs';

@InputType()
export class CsvUploadDto {
  @Field(() => GraphQLUpload, { description: 'Csv file' })
  @IsNotEmpty()
  csvFile!: Promise<FileUpload>;
}
