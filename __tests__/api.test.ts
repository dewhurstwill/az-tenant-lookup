// Import Node Module
import request from 'supertest';

// Import express app
import app from '../src/app';

// Test root API endpoint
// API root should return a 404, this will be updated at somepoint to 501 Not Implemented 
describe('GET /find-tenant', () => {
  it('Responds with a 404 message', async () => {
    const result = await request(app).get('/find-tenant');
    expect(result.statusCode).toEqual(404);
  });
});

// Test by-domain API endpoint - invalid
describe('GET /find-tenant/by-domain/:tenant', () => {
  it('Responds with a 404 message', async () => {
    const result = await request(app).get('/find-tenant/by-domain/invalidTenant');
    expect(result.statusCode).toEqual(404);
    expect(result.body).toEqual({ statusCode: 404, statusMessage: 'Failed', data: { errorMessage: 'Tenant not found', invalidTenant: 'invalidTenant' }});
  });
});

// Test by-domain API endpoint - microsoft.com
describe('GET /find-tenant/by-domain/:tenant', () => {
  it('Responds with a 404 message', async () => {
    const result = await request(app).get('/find-tenant/by-domain/microsoft.com');
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual({ statusCode: 200, statusMessage: 'Success', data: { tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47', tenantRegion: 'WW' }});
  });
});