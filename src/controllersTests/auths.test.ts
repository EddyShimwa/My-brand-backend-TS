import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import express from 'express';
import authRoutes from '../routes/authRoutes';
import User from '../models/User';
import app from '../app' 

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  try {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), {});
  } catch (error) {
    console.error('Failed to create MongoMemoryServer', error);
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('POST /auth/login', () => {
  it('should login a user and return a token', async () => {
    const user = await User.create({ username: 'test', email: 'test@test.com', password: 'password', role: 'user' });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@test.com', password: 'password' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.response).toHaveProperty('token');
    expect(res.body.response.user.username).toEqual('test');
    expect(res.body.response.user.email).toEqual('test@test.com');
  });
});

describe('POST /auth/signup', () => {
  it('should register a user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ username: 'test', email: '123@test.com', password: 'password', role: 'user' });

    expect(res.statusCode).toEqual(201);
    expect(res.body.user.username).toEqual('test');
    expect(res.body.user.email).toEqual('123@test.com');
  });
});