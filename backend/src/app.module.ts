import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'nestjs-prisma';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthService } from './auth/auth.service';
import { join } from 'path';
import { Request } from 'express';
import { DateScalar } from './scalars/date.scalar';
import { authenticateUserByRequest } from './auth/auth.middleware';
import { ProductModule } from './product/product.module';
import { ArtisanModule } from './artisan/artisan.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductionModule } from './production/production.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

const ENV = process.env.NODE_ENV || 'development';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${ENV}`,
    }),
    AuthModule,
    PrismaModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [
        AuthModule,
        ProductModule,
        ArtisanModule,
        ProductionModule,
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
