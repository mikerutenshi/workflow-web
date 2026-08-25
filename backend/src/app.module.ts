import {
  AdjReason,
  Gender,
  InvType,
  Job,
  Progress,
  TxType,
} from '@/generated/prisma/client';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule, registerEnumType } from '@nestjs/graphql';
import { Request } from 'express';
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
import { SaleModule } from './sale/sale.module';
import { DateScalar } from './scalars/date.scalar';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';

const currentEnv = process.env.NODE_ENV || 'production';
let envFilePath;
if (currentEnv == 'production') {
  envFilePath = '.env';
} else if (currentEnv == 'staging') {
  envFilePath = '.env.staging';
} else if (currentEnv == 'development') {
  envFilePath = '.env.development';
} else {
  envFilePath = '.env';
}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
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
        plugins:
          currentEnv == 'development'
            ? [ApolloServerPluginLandingPageLocalDefault()]
            : [ApolloServerPluginLandingPageDisabled()],
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
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      serveRoot: '/',
      serveStaticOptions: {
        index: false,
      },
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
registerEnumType(TxType, { name: 'TxType' });
registerEnumType(AdjReason, { name: 'AdjReason' });
