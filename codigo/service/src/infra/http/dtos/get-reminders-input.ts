import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, Length } from 'class-validator'

@InputType()
export class GetRemindersInput {
  
  @Field({nullable: true})
  userId: string

  
  @Length(3, 240)
  @Field({nullable: true})
  description: string

  
  @Field({nullable: true})
  datetime: string
}
