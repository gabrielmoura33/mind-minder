import { Reminder as RawReminder } from '@prisma/client'
import { Reminder } from '../../../../../src/application/entities/reminder.entity'

export class PrismaReminderMapper {
  static toPrisma(reminder: Reminder) {
    return {
      id: reminder.id,
      userId: reminder.userId,
      description: reminder.description,
      datetime: reminder.datetime,
      createdAt: reminder.createdAt,
    }
  }

  static toDomain(raw: RawReminder): Reminder {
    return new Reminder(
      {
        description: raw.description,
        datetime: raw.datetime,
        userId: raw.userId,
      },
      raw.id,
    )
  }
}
