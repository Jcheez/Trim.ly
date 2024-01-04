import supertest from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../src/configs/express';

describe('Testing User Controller', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  describe('Testing register route', () => {
    const BASE_REGISTER = '/api/users/register';

    describe('Given that password attribute does not exist when registering', () => {
      it('should return a 400', async () => {
        const res = await supertest(app)
          .post(BASE_REGISTER)
          .send({ email: 'abc@gmail.com', username: 'abc123' });

        const expected = {
          code: 400,
          message: 'Username, password, email are all required'
        };

        expect(JSON.parse(res.text)).toEqual(expected);
      });
    });

    describe('Given that username attribute does not exist when registering', () => {
      it('should return a 400', async () => {
        const res = await supertest(app)
          .post(BASE_REGISTER)
          .send({ email: 'abc@gmail.com', password: 'abc123' });

        const expected = {
          code: 400,
          message: 'Username, password, email are all required'
        };

        expect(JSON.parse(res.text)).toEqual(expected);
      });
    });

    describe('Given that email attribute does not exist when registering', () => {
      it('should return a 400', async () => {
        const res = await supertest(app)
          .post(BASE_REGISTER)
          .send({ username: 'abc123', password: 'abc123' });

        const expected = {
          code: 400,
          message: 'Username, password, email are all required'
        };

        expect(JSON.parse(res.text)).toEqual(expected);
      });
    });

    describe('Given that all attributes are present and a unique email is entered', () => {
      it('should return a 201', async () => {
        const res = await supertest(app).post(BASE_REGISTER).send({
          username: 'abc123',
          password: 'abc123',
          email: 'abc@abc.com'
        });

        const expected = {
          code: 201,
          message: 'Registration is successful'
        };

        expect(JSON.parse(res.text)).toEqual(expected);
      });
    });

    describe('Given that if there is a user created with a duplicate email', () => {
      it('should return a 409', async () => {
        const res = await supertest(app).post(BASE_REGISTER).send({
          username: 'abc123',
          password: 'abc123',
          email: 'abc@abc.com'
        });

        const expected = {
          code: 409,
          message: 'Email is already in use'
        };

        expect(JSON.parse(res.text)).toEqual(expected);
      });
    });
  });

  describe('Testing login route', () => {
    const BASE_LOGIN = '/api/users/login';

    describe('Given that password attribute does not exist upon login', () => {
      it('should return a 400', async () => {
        const res = await supertest(app)
          .post(BASE_LOGIN)
          .send({ email: 'abc@gmail.com' });

        const expected = {
          code: 400,
          message: 'Email and password are all required'
        };

        expect(JSON.parse(res.text)).toEqual(expected);
      });
    });

    describe('Given that email attribute does not exist upon login', () => {
      it('should return a 400', async () => {
        const res = await supertest(app)
          .post(BASE_LOGIN)
          .send({ password: 123123 });

        const expected = {
          code: 400,
          message: 'Email and password are all required'
        };

        expect(JSON.parse(res.text)).toEqual(expected);
      });
    });

    describe('Given that email is not registered', () => {
      it('should return a 401', async () => {
        const res = await supertest(app)
          .post(BASE_LOGIN)
          .send({ email: 'abc@123.com', password: 123123 });

        const expected = {
          code: 401,
          message: 'Password and email combination is incorrect'
        };

        expect(JSON.parse(res.text)).toEqual(expected);
      });
    });

    describe('Given that email is registered but password is wrong', () => {
      it('should return a 401', async () => {
        const res = await supertest(app)
          .post(BASE_LOGIN)
          .send({ email: 'abc@abc.com', password: '123123' });

        const expected = {
          code: 401,
          message: 'Password and email combination is incorrect'
        };

        expect(JSON.parse(res.text)).toEqual(expected);
      });
    });

    describe('Given that email is registered and password is correct', () => {
      it('should return a 200', async () => {
        const res = await supertest(app)
          .post(BASE_LOGIN)
          .send({ email: 'abc@abc.com', password: 'abc123' });

        expect(res.status).toEqual(200);
      });

      test('if accessToken attribute is present in response', async () => {
        const { text } = await supertest(app)
          .post(BASE_LOGIN)
          .send({ email: 'abc@abc.com', password: 'abc123' });

        expect(JSON.parse(text).data).toHaveProperty('accessToken');
      });
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
});
