import supertest from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import app from '../src/configs/express';

// Mock the verifyJWT middleware
jest.mock('../src/middlewares/verifyJWT', () => ({
  verifyJWT: (req: Request, res: Response, next: NextFunction) => next()
}));

// Mock the verifyJWT middleware
jest.mock('../src/middlewares/decryptJWT', () => ({
  decryptJWT: (req: Request, res: Response, next: NextFunction) => next()
}));

describe('Testing Shortcut Controller', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  describe('Testing add route', () => {
    const BASE_ADD = '/api/shortcuts/add';
    const sampleUser = supertest(app)
      .post('/api/users/login')
      .send({ email: 'abc@abc.com', password: 'abc123' });

    describe('Given that uuid attribute does not exist when adding a shortcut', () => {
      it('should return a 400', async () => {
        console.log(await sampleUser);
        const res = await supertest(app)
          .post(BASE_ADD)
          .send({ original: 'https://abc.com', shortcut: 'abc' });

        const expected = {
          code: 400,
          message: 'Every shortcut must have an owner'
        };

        expect(JSON.parse(res.text)).toEqual(expected);
      });
    });

    // describe('Given that original attribute does not exist when registering', () => {
    //   it('should return a 400', async () => {
    //     const res = await supertest(app)
    //       .post(BASE_ADD)
    //       .send({ shortcut:'abc' });

    //     const expected = {
    //       code: 400,
    //       message: 'Original link is a required field'
    //     };

    //     expect(JSON.parse(res.text)).toEqual(expected);
    //   });
    // });
  });
});
