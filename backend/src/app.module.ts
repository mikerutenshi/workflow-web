import {
  Gender,
  InvType,
  Job,
  PrismaClient,
  Progress,
} from '@/generated/client';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule, registerEnumType } from '@nestjs/graphql';
import { Request } from 'express';
import { CustomPrismaModule } from 'nestjs-prisma';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtisanModule } from './artisan/artisan.module';
import { authenticateUserByRequest } from './auth/auth.middleware';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { InventoryModule } from './inventory/inventory.module';
import { ProductModule } from './product/product.module';
import { ProductionModule } from './production/production.module';
import { DateScalar } from './scalars/date.scalar';
import { SaleModule } from './sale/sale.module';

const ENV = process.env.NODE_ENV || 'development';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${ENV}`,
    }),
    AuthModule,
    CustomPrismaModule.forRoot({
      isGlobal: true,
      name: 'PrismaService',
      client: new PrismaClient(),
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [
        AuthModule,
        ProductModule,
        ArtisanModule,
        ProductionModule,
        InventoryModule,
        SaleModule,
        ConfigModule,
      ],
      inject: [AuthService, ConfigService],
      useFactory: (authService: AuthService, configService: ConfigService) => ({
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        cors: {
          origin: [configService.get('CORS_ORIGIN') || ''],
          credentials: true,
        },
        context: async ({ req }: { req: Request }) => {
          const user = await authenticateUserByRequest(authService, req);
          return { req, user };
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, DateScalar],
})
export class AppModule {}

registerEnumType(Job, { name: 'Job' });
registerEnumType(Gender, { name: 'Gender' });
registerEnumType(Progress, { name: 'Progress' });
registerEnumType(InvType, { name: 'InvType' });
