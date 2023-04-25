import { Injectable } from '@nestjs/common'
import { Reminder } from 'src/application/entities/reminder.entity'
import { RemindersRepository } from 'src/application/repositories/reminders.repository'
import { PrismaService } from '../prisma.service'
import { PrismaReminderMapper } from '../mappers/prisma-reminder-mapper'

@Injectable()
export class PrismaRemindersRepository implements RemindersRepository {
  constructor(private prisma: PrismaService) {}

  async create(reminder: Reminder): Promise<void> {
    const data = PrismaReminderMapper.toPrisma(reminder);

    await this.prisma.reminder.create({
      data: {
        id: data.id,
        userId: data.userId,
        description: data.description,
        datetime: data.datetime,
      }
    })
  }


  async findById(id: string): Promise<Reminder> {
    const reminder = await this.prisma.reminder.findUnique({
      where: {
        id,
      },
    })

    return reminder ? PrismaReminderMapper.toDomain(reminder) : {} as Reminder
  }

  async find(query: any): Promise<Reminder[]> {
    const reminders = await this.prisma.reminder.findMany({
      where: {
        id: {
          contains: query.id,
        },
        userId: {
          contains: query.userId,
        },
        description: {
          contains: query.description,
        },
      }
    })

    return reminders.map(PrismaReminderMapper.toDomain)
  }

  async deleteById(reminderId: string): Promise<void> {
    await this.prisma.reminder.delete({
      where: {
        id: reminderId,
      },
    })
  }
}
