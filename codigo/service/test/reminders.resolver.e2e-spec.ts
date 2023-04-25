import { INestApplication } from "@nestjs/common";
import { Test } from '@nestjs/testing';
import { AppModule } from "../src/app.module";

import * as request from 'supertest';

describe('Reminders Resolver', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('[MUTATION] Create Reminder', async() => {
    it('should create a new reminder', async () => {
      const createReminderInput = {
        userId: '1',
        description: 'Test reminder',
        datetime: '2023-05-01T10:00:00.000Z',
      };
    
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `mutation createReminder($data: CreateReminderInput!) {
            createReminder(data: $data) {
              id
              userId
              description
              datetime
            }
          }`,
          variables: { data: createReminderInput },
        });
    
      expect(response.status).toBe(200);
      expect(response.body.data.createReminder).toHaveProperty('id');
      expect(response.body.data.createReminder.userId).toBe(createReminderInput.userId);
      expect(response.body.data.createReminder.description).toBe(createReminderInput.description);
      expect(response.body.data.createReminder.datetime).toBe(createReminderInput.datetime);
    });
  });


  describe('[QUERY] Get Reminders', () => {
    it('should get reminders based on filters', async () => {
      const getRemindersInput = {
        userId: '1',
      };
    
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `query reminders($filters: GetRemindersInput!) {
            reminders(filters: $filters) {
              id
              userId
              description
              datetime
            }
          }`,
          variables: { filters: getRemindersInput },
        });
    
      expect(response.status).toBe(200);
      expect(response.body.data.reminders).toBeInstanceOf(Array);
      expect(response.body.data.reminders.length).toBeGreaterThan(0);
      response.body.data.reminders.forEach((reminder) => {
        expect(reminder.userId).toBe(getRemindersInput.userId);
      });
    });
  });

  describe('[MUTATION] Delete Reminder', () => {
    it('should delete a reminder by id', async () => {
      const reminderId = '1';
    
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `mutation deleteReminder($id: String!) {
            deleteReminder(id: $id)
          }`,
          variables: { id: reminderId },
        });
    
      expect(response.status).toBe(200)
    });
  });
  
});