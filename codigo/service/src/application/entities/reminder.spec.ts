import { randomUUID } from 'crypto'
import { Reminder } from './reminder.entity'

describe('Reminder', () => {
  it('should be able to create a reminder', () => {
    const reminder = new Reminder(
      {
        userId: randomUUID(),
        description: 'Test reminder',
        datetime: new Date(),
      },
      randomUUID(),
    )

    expect(reminder).toBeTruthy()
  })
})
