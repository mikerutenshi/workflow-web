import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [AuthResolver, AuthService],
  imports: [JwtModule.register({ secret: process.env.JWT }), PrismaModule],
  exports: [AuthService],
})
export class AuthModule {}
