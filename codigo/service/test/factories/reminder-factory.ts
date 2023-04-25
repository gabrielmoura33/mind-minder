import { randomUUID } from "crypto";
import { Reminder } from "@application/entities/reminder.entity";

export function makeRemindersForMultipleUsers(amount: number = 1) {
    const reminders = [] as Reminder[];
    for (let i = 0; i < amount; i++) {
        reminders.push(
            new Reminder({
                userId: randomUUID(),
                description: 'Test reminder ' + i,
                datetime: new Date()
            })
        )
    }
    return reminders;
}

export function makeRemindersForSingleUser(amount: number = 1) {
    const reminders = [] as Reminder[];
    for (let i = 0; i < amount; i++) {
        reminders.push(
            new Reminder({
                userId: '123',
                description: 'Test reminder ' + i,
                datetime: new Date()
            })
        )
    }
    return reminders;
}