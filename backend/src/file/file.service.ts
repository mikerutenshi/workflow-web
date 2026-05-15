import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { mkdir } from 'fs/promises';
import { join } from 'path';
import { Readable } from 'stream';
import * as csv from 'fast-csv';
import { CsvUploadDto } from './dto/csv-upload.dto';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class FileService {
  private async streamToBuffer(readableStream: Readable): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: any = [];
      readableStream.on('data', (data: any) => {
        if (typeof data === 'string') {
          // Convert string to Buffer assuming UTF-8 encoding
          chunks.push(Buffer.from(data, 'utf-8'));
        } else if (data instanceof Buffer) {
          chunks.push(data);
        } else {
          // Convert other data types to JSON and then to a Buffer
          const jsonData = JSON.stringify(data);
          chunks.push(Buffer.from(jsonData, 'utf-8'));
        }
      });
      readableStream.on('end', () => {
        resolve(Buffer.concat(chunks));
      });
      readableStream.on('error', reject);
    });
  }

  async downloadObjects(fileName: string, objects: any[]): Promise<string> {
    const dir = join(process.cwd(), 'public', 'downloads');
    await mkdir(dir, { recursive: true });
    const filePath = join(dir, fileName);

    const writableStream = createWriteStream(filePath);

    await new Promise<void>((resolve, reject) => {
      const csvStream = csv.format({ headers: true });
      writableStream.on('finish', resolve);
      writableStream.on('error', reject);
      csvStream.on('error', reject);
      csvStream.pipe(writableStream);

      objects.forEach((item) => csvStream.write(item));
      csvStream.end();
    });

    return `/downloads/${fileName}`;
  }

  async readObjects<T, Y>(
    fileInput: CsvUploadDto,
    onData: (row: T) => Y,
  ): Promise<Y[]>;

  async readObjects<T>(fileInput: CsvUploadDto): Promise<T[]>;

  async readObjects<T = any, Y = T>(
    fileInput: CsvUploadDto,
    onData?: (row: T) => Y,
  ): Promise<Y[]> {
    if (!fileInput.csvFile) {
      throw new Error('No file provided');
    }

    const rows: Y[] = [];
    const { createReadStream } = await fileInput.csvFile;

    return new Promise<Y[]>((resolve, reject) => {
      createReadStream()
        .pipe(csv.parse({ headers: true }))
        .on('error', reject)
        .on('data', (row) => {
          try {
            const processed = onData ? onData(row) : (row as unknown as Y);
            rows.push(processed);
          } catch (error) {
            reject(error);
          }
        })
        .on('end', () => resolve(rows));
    });
  }

  async validateDto<T extends object>(
    dtoClass: ClassConstructor<T>,
    plain: any,
  ) {
    const instance = plainToClass(dtoClass, plain);
    const errors = await validate(instance);

    if (errors.length > 0) {
      throw new Error(`Validation failed: ${JSON.stringify(errors)}`);
    }

    return instance;
  }
}
