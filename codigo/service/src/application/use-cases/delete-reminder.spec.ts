import { InMemoryRemindersRepository } from "@test/repositories/in-memory-reminder-repository";
import { DeleteReminder } from "./delete-reminder";
import { Reminder } from "../entities/reminder.entity";
describe('Delete reminder', () => {
    it('should be able to delete reminder', async () => {
        const remindersRepository = new InMemoryRemindersRepository();
        const deleteReminderUseCase = new DeleteReminder(remindersRepository);
        
        const reminderRaw = new Reminder({            
            userId: '123',
            description: 'Test reminder',
            datetime: new Date()
        })
        await remindersRepository.create(reminderRaw);
        await deleteReminderUseCase.execute({ id: reminderRaw.id });

        expect(remindersRepository.reminders).toHaveLength(0);        
    });
});