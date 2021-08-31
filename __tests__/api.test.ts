// Import Node Module
import request from 'supertest';

// Import express app
import app from '../src/app';

// Test root API endpoint
describe('GET /api/v1', () => {
  it('Responds with a json message', async () => {
    const result = await request(app).get('/api/v1');
    expect(result.header['content-type']).toContain('application/json');
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual({ message: 'API - 👋🌎🌍🌏' });
  });
});

// Test emojis route endpoint
describe('GET /api/v1/emojis', () => {
  it('Responds with a json message', async () => {
    const result = await request(app).get('/api/v1/emojis');
    expect(result.header['content-type']).toContain('application/json');
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(['😀', '😳', '🙄']);
  });
});