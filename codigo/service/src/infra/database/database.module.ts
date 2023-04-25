import { Module } from '@nestjs/common'

import { PrismaService } from './prisma/prisma.service'
import { RemindersRepository } from '../../../src/application/repositories/reminders.repository'
import { PrismaRemindersRepository } from './prisma/repositories/prisma-reminders-repository'

/**
 * @inheritdoc NestJS structure to use Prisma as a database but injecting it as a dependency.
 */
@Module({
  providers: [
    PrismaService,
    {
      provide: RemindersRepository,
      useClass: PrismaRemindersRepository,
    },
  ],
  exports: [RemindersRepository],
})
export class DatabaseModule {}
