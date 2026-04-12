import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';

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
}
