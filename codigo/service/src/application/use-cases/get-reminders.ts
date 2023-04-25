
import { Injectable } from '@nestjs/common';
import { RemindersRepository } from '../repositories/reminders.repository';
import { Reminder } from '../entities/reminder.entity';


interface GetRecipienRemindersRequest {  
  userId?: string
  description?: string    
  datetime?: Date
}

interface GetRecipienRemindersResponse {
  reminders: Reminder[];
}

@Injectable()
export class GetReminders {
  constructor(private remindersRepository: RemindersRepository) {}

  async execute(
    request: GetRecipienRemindersRequest,
  ): Promise<GetRecipienRemindersResponse> {
    const { userId, description, datetime } = request;

    const reminders =
      await this.remindersRepository.find({
        userId,
        description,
        datetime,

      });

    return {
      reminders: reminders || [],
    };
  }
}
