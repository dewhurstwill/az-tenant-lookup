// Import Node Module
import request from 'supertest';

// Import express app
import app from '../src/app';

// Test app root route endpoint
describe('GET /', () => {
  it('Responds with a json message', async () => {
    const result = await request(app).get('/');
    expect(result.header['content-type']).toContain('application/json');
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual({ message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄' });
  });
});