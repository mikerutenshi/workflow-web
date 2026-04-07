import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3001;
  console.log(`Env -> ${process.env.NODE_ENV}`);
  console.log(`Origin -> ${configService.get('CORS_ORIGIN')}`);
  console.log(`DB -> ${configService.get('DATABASE_URL')}`);

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

  await app.listen(port);
}
bootstrap();
