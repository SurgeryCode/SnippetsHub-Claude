const request = require('supertest');
const app = require('../src/app');

describe('App Tests', () => {
    it('should respond with a 200 status for the root route', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });

    it('should return JSON data for the API endpoint', async () => {
        const response = await request(app).get('/api/data');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
    });

    it('should handle 404 errors', async () => {
        const response = await request(app).get('/non-existent-route');
        expect(response.status).toBe(404);
    });
});