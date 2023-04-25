import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, Length } from 'class-validator'

@InputType()
export class CreateReminderInput {
  @IsNotEmpty()
  @Field()
  userId: string

  @IsNotEmpty()
  @Length(3, 240)
  @Field()
  description: string

  @IsNotEmpty()
  @Field()
  datetime: string
}
