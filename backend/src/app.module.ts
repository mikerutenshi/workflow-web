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
import { ConfigModule } from '@nestjs/config';
import { ProductionModule } from './production/production.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    AuthModule,
    PrismaModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [AuthModule, ProductModule, ArtisanModule, ProductionModule],
      inject: [AuthService],
      useFactory: (authService: AuthService) => ({
        playground: true,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        cors: {
          origin: [
            'http://localhost:3000',
            'http://127.0.0.1:3000',
            'http://192.168.100.7',
          ],
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
