import { Prisma, PrismaClient } from '@/generated/client';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'query'>
  implements OnModuleDestroy, OnModuleInit
{
  constructor(configService: ConfigService) {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'stdout',
          level: 'error',
        },
        {
          emit: 'stdout',
          level: 'info',
        },
        {
          emit: 'stdout',
          level: 'warn',
        },
      ],
      datasources: {
        db: {
          url: configService.get<string>('DATABASE_URL'),
        },
      },
    });

    // this.$on('query', (e) => {
    // console.log('Query: ' + e.query);
    // console.log('Params: ' + e.params);
    // console.log('Duration: ' + e.duration + 'ms');
    // });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  onModuleInit() {}
}
