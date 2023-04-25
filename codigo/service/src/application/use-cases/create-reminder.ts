import { Injectable } from '@nestjs/common'
import { Reminder } from '../entities/reminder.entity'
import { RemindersRepository } from '../repositories/reminders.repository'

interface CreateReminderRequest {
  userId: string
  description: string
  datetime: Date
}

interface CreateReminderResponse {
  reminder: Reminder
}

@Injectable()
export class CreateReminder {
  constructor(private remindersRepository: RemindersRepository) {}

  async execute(
    request: CreateReminderRequest,
  ): Promise<CreateReminderResponse> {
    const { userId, description, datetime } = request

    const reminder = new Reminder({
      userId,
      description,
      datetime,
    })

    await this.remindersRepository.create(reminder)

    return {
      reminder,
    }
  }
}
