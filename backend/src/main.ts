import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3001;
  const origin = configService.get('CORS_ORIGIN');

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.enableCors({
    origin: [configService.get('CORS_ORIGIN') || ''],
    credentials: true,
  });
  app.use(graphqlUploadExpress({ maxFileSize: 100000, maxFiles: 10 }));

  await app.listen(port);
  Logger.log(`Server Running on localhost:${port}`, 'Bootstrap');
  Logger.log(`CORS origin: ${origin}`, 'Bootstrap');
}
bootstrap();
