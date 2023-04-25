import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CreateReminder } from 'src/application/use-cases/create-reminder'
import { ApolloFederationDriver } from '@nestjs/apollo'
import { GraphQLModule } from '@nestjs/graphql'
import { resolve } from 'node:path'
import { RemindersResolver } from './resolvers/reminders.resolver'
import { GetReminders } from 'src/application/use-cases/get-reminders'
import { DeleteReminder } from 'src/application/use-cases/delete-reminder'

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloFederationDriver,
      autoSchemaFile: resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [CreateReminder, RemindersResolver, GetReminders, DeleteReminder],
})
export class HttpModule {}
