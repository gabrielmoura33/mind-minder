import { InMemoryRemindersRepository } from "@test/repositories/in-memory-reminder-repository";
import { GetReminders } from "./get-reminders";
import {  makeRemindersForSingleUser } from "@test/factories/reminder-factory";
describe('Get reminders', () => {
    it('should be able to get all the reminders for a user', async () => {
        const amount = 4
        const remindersRepository = new InMemoryRemindersRepository();
        const getRemindersUseCase = new GetReminders(remindersRepository);
        
        const mockReminders = makeRemindersForSingleUser(amount);
        for (const reminder of mockReminders) {
            await remindersRepository.create(reminder);
        }
        
        const { reminders } = await getRemindersUseCase.execute({ userId: '123' });        

        expect(reminders).toHaveLength(amount);        
    });

    it('should be able to search the reminders for a user', async () => {
        const amount = 4
        const remindersRepository = new InMemoryRemindersRepository();
        const getRemindersUseCase = new GetReminders(remindersRepository);
        
        const mockReminders = makeRemindersForSingleUser(amount);
        for (const reminder of mockReminders) {
            await remindersRepository.create(reminder);
        }
        
        const { reminders } = await getRemindersUseCase.execute({ userId: '123', description: 'Test'});        

        expect(reminders).toHaveLength(amount);        
    });
});