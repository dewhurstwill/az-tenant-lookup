// Import Node Module
import request from 'supertest';

// Import express app
import app from '../src/app';

// Test route notFound middleware
describe('app - notFound middleware', () => {
  it('Responds with a not found message', async () => {
    const result = await request(app).get('/what-is-this-even');
    expect(result.header['content-type']).toContain('application/json');
    expect(result.statusCode).toEqual(404);
  });
});

describe('app - helmet library', () => {
  it('Removes x-powered-by from headers', async () => {
    const result = await request(app).get('/');
    console.log(result)
    expect(result.header['content-type']).toContain('application/json');
    expect(result.statusCode).toEqual(200);
    expect(Object.keys(result.headers)).not.toContain('x-powered-by');
    expect(Object.keys(result.headers)).toContain('content-security-policy');
    expect(Object.keys(result.headers)).toContain('x-dns-prefetch-control');
    expect(Object.keys(result.headers)).toContain('expect-ct');
    expect(Object.keys(result.headers)).toContain('x-frame-options');
    expect(Object.keys(result.headers)).toContain('strict-transport-security');
    expect(Object.keys(result.headers)).toContain('x-download-options');
    expect(Object.keys(result.headers)).toContain('x-content-type-options');
    expect(Object.keys(result.headers)).toContain('x-permitted-cross-domain-policies');
    expect(Object.keys(result.headers)).toContain('referrer-policy');
    expect(Object.keys(result.headers)).toContain('x-xss-protection');
  })
});