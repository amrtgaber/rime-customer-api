import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private config: ConfigService) {
    super({
      datasources: {
        db: {
          url:
            config.get('DATABASE_URL') ||
            /* istanbul ignore next */
            process.env.HEROKU_POSTGRESQL_URL, // todo: add this during heroku setup
        },
      },
    });
  }
}
