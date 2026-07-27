import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from '@/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [AuthResolver, AuthService],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT'),
        signOptions: { expiresIn: '30 days' },
      }),
      inject: [ConfigService],
    }),
    PrismaModule,
    HttpModule,
  ],
  exports: [AuthService],
})
export class AuthModule {}
