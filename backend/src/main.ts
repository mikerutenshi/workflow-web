import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { execSync } from 'child_process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3001;
  console.log(`Env -> ${process.env.NODE_ENV}`);

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.enableCors({
    origin: [
      configService.get('CORS_ORIGIN_1') || '',
      configService.get('CORS_ORIGIN_2') || '',
      configService.get('CORS_ORIGIN_3') || '',
    ],
    credentials: true,
  });

  await app.listen(port);

  try {
    if (process.env.NODE_ENV != 'development') {
      console.log('Running Prisma db push...');
      execSync('npx prisma db push', { stdio: 'inherit' });

      console.log('Running Prisma db seed...');
      execSync('npx prisma db seed', { stdio: 'inherit' });

      console.log('Prisma setup completed.');
    }
    // } else {
    //   console.log('Running Prisma db seed...');
    //   execSync('npx prisma db seed', { stdio: 'inherit' });

    //   console.log('Prisma setup completed.');
    // }
  } catch (error) {
    console.error('Error executing Prisma commands:', error);
  }
}
bootstrap();
