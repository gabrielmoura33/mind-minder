import { Reminder } from "@application/entities/reminder.entity";
import { RemindersRepository } from "@application/repositories/reminders.repository";

interface InMemoryRemindersRepositoryFindProps {
    userId?: string;
    description?: string;
    datetime?: Date;
}
export class InMemoryRemindersRepository implements RemindersRepository {
    public reminders: Reminder[] = [];

    async create(reminder: Reminder): Promise<void> {
        this.reminders.push(reminder);
        await Promise.resolve(() => true);
    }

    async deleteById(reminderId: string): Promise<void> {
        const reminderIndex = this.reminders.findIndex(reminder => reminder.id === reminderId);

        if(reminderIndex === -1) {}

        this.reminders.splice(reminderIndex, 1);
        Promise.resolve(() => true);
    }

    find(query: InMemoryRemindersRepositoryFindProps): Promise<Reminder[]> {
        const reminders = this.reminders.filter(reminder => {
            if(query.userId && reminder.userId !== query.userId) {
                return false;
            }
            if(query.description && !reminder.description.includes(query.description)) {
                return false;
            }
            if(query.datetime && reminder.datetime !== query.datetime) {
                return false;
            }

            return true;
        });

        return Promise.resolve(reminders);
    }
    
}