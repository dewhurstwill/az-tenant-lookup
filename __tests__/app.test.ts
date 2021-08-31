// Import Node Module
import request from 'supertest';

// Import express app
import app from '../src/app';

// Test app root route endpoint
// App root should return a 404, this will be updated at somepoint to 501 Not Implemented 
describe('GET /', () => {
  it('Responds with a 404', async () => {
    const result = await request(app).get('/');
    expect(result.header['content-type']).toContain('application/json');
    expect(result.statusCode).toEqual(404);
  });
});