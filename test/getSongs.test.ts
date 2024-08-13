import request from 'supertest';
import { createApp } from '../src/app';
import { songsRouter } from '../src/routes/songs';
import fs from 'fs';

/* ------------------------------------------------------------------------- */

jest.mock('fs');  // Mock the fs module

// Load mock data from the mockData.json file
const mockData = require('./mockSongData.json');

// Mock fs.readFileSync to return the mock data
(fs.readFileSync as jest.Mock).mockImplementation((filePath: string) => {
    if (filePath.endsWith('songData.json')) {   // This is very specific
        return JSON.stringify(mockData);
    }
    return JSON.stringify([]);
});

// AppConfig for unit testing
const testConfig = [
    {
        route: songsRouter,
        filename: 'songData.json',
        fsModule: fs  // Use the mocked fs module
    }
];

// Create the app with the test configuration
const app = createApp(testConfig);

describe('GET /api/songs', () => {

    test('[200] should return all songs', async () => {
        const response = await request(app).get('/api/songs');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockData);
    });

    test('[200] should return specific song by ID', async () => {
        const response = await request(app).get('/api/songs/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockData[0]);
    });

    test('[400] should return 400 for invalid id', async () => {
        const response = await request(app).get('/api/songs/hello');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            statusCode: 400,
            statusDescription: 'Bad Request',
            message: 'Invalid ID.'
        });
    })

    test('[404] should return 404 for non-existent song', async () => {
        const response = await request(app).get('/api/songs/999');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            statusCode: 404,
            statusDescription: 'Not Found',
            message: 'Song not found.'
        });
    });
});
