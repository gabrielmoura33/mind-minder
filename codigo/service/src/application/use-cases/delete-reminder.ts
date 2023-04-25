
import { Injectable } from '@nestjs/common';
import { RemindersRepository } from '../repositories/reminders.repository';



interface DeleteReminderRemindersRequest {  
  id: string;
}



@Injectable()
export class DeleteReminder {
  constructor(private remindersRepository: RemindersRepository) {}

  async execute(
    request: DeleteReminderRemindersRequest,
  ): Promise<void> {
    const { id } = request;
    await this.remindersRepository.deleteById(id);    
  }
}
