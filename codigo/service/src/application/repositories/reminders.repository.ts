import { Reminder } from '../entities/reminder.entity'

export abstract class RemindersRepository {
  abstract create(reminder: Reminder): Promise<void>  
  abstract deleteById(reminderId: string): Promise<void>  
  abstract find(query: any): Promise<Reminder[] | null>
}
