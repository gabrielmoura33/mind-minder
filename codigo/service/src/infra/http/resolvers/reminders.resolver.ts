import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Reminder } from 'src/application/entities/reminder.entity'
import { CreateReminderInput } from '../dtos/create-reminder-body'
import { CreateReminder } from 'src/application/use-cases/create-reminder'
import { parseISO } from 'date-fns';
import { GetRemindersInput } from '../dtos/get-reminders-input';
import { GetReminders } from 'src/application/use-cases/get-reminders';
import { DeleteReminder } from 'src/application/use-cases/delete-reminder';

@Resolver(() => Reminder)
export class RemindersResolver {    
    constructor(
        private readonly createReminderUseCase: CreateReminder,
        private readonly getRemindersUseCase: GetReminders,
        private readonly deleteReminderUseCase: DeleteReminder
    ) {
    }

    @Mutation(() => Reminder, {
        name: 'createReminder'
    })
    async createReminder(@Args('data') data: CreateReminderInput) {
        const { reminder } = await this.createReminderUseCase.execute({
            ...data,
            datetime: parseISO(data.datetime)
        })
        return reminder
    }

    @Query(() => [Reminder], {
        name: "reminders"
    })
    async getReminders(@Args('filters') data: GetRemindersInput) {
        let query = {
            userId: data.userId,
            description: data.description,
            datetime: data.datetime ? parseISO(data.datetime) : undefined
        }
        const { reminders } = await this.getRemindersUseCase.execute(query)
        return reminders
    }

    @Mutation(() => Boolean)
    async deleteReminder(@Args('id') id: string) {
        await this.deleteReminderUseCase.execute({ id })
        return true;
    }
    
}
