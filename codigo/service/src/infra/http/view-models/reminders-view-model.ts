import { Reminder } from 'src/application/entities/reminder.entity'

export class RemindersViewModel {
  static toHTTP(reminder: Reminder) {
    return {
      id: reminder.id,
      description: reminder.description,
      userId: reminder.userId,
      datetime: reminder.datetime,
      createdAt: reminder.createdAt,
    }
  }
}
