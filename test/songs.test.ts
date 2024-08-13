import request from 'supertest';
import { createApp } from '../src/app';
import { songsRouter } from '../src/routes/songs';
import fs from 'fs';

/* ------------------------------------------------------------------------- */

jest.mock('fs');  // Mock the fs module

// Mock data to be used in tests
const mockSongData = [
    {
        id: 1,
        name: "Back In Black",
        artist: "AC/DC",
        album: "Back In Black",
        duration: 255000,
        year: 1980
    },
    {
        id: 2,
        name: "Beast and the Harlot",
        artist: "Avenged Sevenfold",
        album: "City of Evil",
        duration: 344000,
        year: 2005
    }
];

// Mock fs.readFileSync to return the mock data
(fs.readFileSync as jest.Mock).mockImplementation((filePath: string) => {
    console.log(`Mocked fs.readFileSync called with path: ${filePath}`);
    if (filePath.endsWith('songData.json')) {   // This is very specific
        return JSON.stringify(mockSongData);
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
        expect(response.body).toEqual(mockSongData);
    });

    test('[200] should return specific song by ID', async () => {
        const response = await request(app).get('/api/songs/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockSongData[0]);
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
