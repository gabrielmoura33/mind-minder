import { InMemoryRemindersRepository } from "@test/repositories/in-memory-reminder-repository";
import { CreateReminder } from "./create-reminder";
import { randomUUID } from "crypto";

describe('Create reminder use case', () => {
  it('should be able to crea a new reminder', async () => {
    const remindersRepository = new InMemoryRemindersRepository();
    const createReminderUseCase = new CreateReminder(remindersRepository);

    const { reminder } = await createReminderUseCase.execute({
        userId: randomUUID(),
        description: 'Test reminder',
        datetime: new Date()
    });

    expect(remindersRepository.reminders).toHaveLength(1);
    expect(remindersRepository.reminders[0]).toEqual(reminder);
  });
});
