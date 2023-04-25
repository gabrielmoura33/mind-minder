import { ObjectType, Field, ID } from '@nestjs/graphql'
import { randomUUID } from 'node:crypto'
import { Replace } from 'src/shared/helpers/Replace'



export interface ReminderProps {
  userId: string
  description: string
  datetime: Date
  createdAt: Date
}

@ObjectType()
export class Reminder {
  private _id: string
  private props: ReminderProps

  constructor(
    props: Replace<ReminderProps, { createdAt?: Date }>,
    id?: string,
  ) {
    this.props = { ...props, createdAt: new Date() }
    this._id = id ?? randomUUID()
  }

  @Field(() => ID)
  public get id(): string {
    return this._id
  }

  @Field()
  public get userId(): string {
    return this.props.userId
  }

  public set userId(userId: string) {
    this.props.userId = userId
  }

  @Field()
  public get description(): string {
    return this.props.description
  }

  public set description(description: string) {
    this.props.description = description
  }

  @Field()
  public get datetime(): Date {
    return this.props.datetime 
  }

  public set datetime(datetime: Date) {
    this.props.datetime = datetime
  }

  @Field()
  public get createdAt(): Date {
    return this.props.createdAt
  }
}

// @ObjectType()
// export class Reminder {
//   props: any
//   _id: any
//   constructor(
//     props: Replace<ReminderProps, { createdAt?: Date }>,
//     id?: string,
//   ) {
//     this.props = { ...props, createdAt: new Date() }
//     this._id = id ?? randomUUID()
//   }

//   @Field(() => ID)
//   id: string

//   @Field()
//   userId: string

//   @Field()
//   description: string

//   @Field()
//   datetime: Date

//   @Field()
//   createdAt: Date
// }
