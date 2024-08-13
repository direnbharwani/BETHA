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

describe('POST /api/songs', () => {

    test('[201] should add a new song with valid data', async () => {
        const newSong = {
            name: "So Cold",
            artist: "Breaking Benjamin",
            album: "We Are Not Alone",
            duration: 273000,
            year: 2004
        };

        const response = await request(app)
            .post('/api/songs')
            .send(newSong);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            statusCode: 201,
            statusDescription: 'Created',
            message: 'Song added.'
        });
    });

    test('[400] should return validation error for missing name', async () => {
        const newSong = {
            artist: "Breaking Benjamin",
            album: "We Are Not Alone",
            duration: 273000,
            year: 2004
        };

        const response = await request(app)
            .post('/api/songs')
            .send(newSong);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            statusCode: 400,
            statusDescription: 'Bad Request',
            message: "must have required property 'name'"
        });
    });

    test('[400] should return validation error for invalid name', async () => {
        const newSong = {
            name: "",
            artist: "Breaking Benjamin",
            album: "We Are Not Alone",
            duration: 273000,
            year: 2004
        };

        const response = await request(app)
            .post('/api/songs')
            .send(newSong);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            statusCode: 400,
            statusDescription: 'Bad Request',
            message: "must NOT have fewer than 1 characters"
        });
    });

    test('[400] should return validation error for missing artist', async () => {
        const newSong = {
            name: "So Cold",
            album: "We Are Not Alone",
            duration: 273000,
            year: 2004
        };

        const response = await request(app)
            .post('/api/songs')
            .send(newSong);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            statusCode: 400,
            statusDescription: 'Bad Request',
            message: "must have required property 'artist'"
        });
    });

    test('[400] should return validation error for invalid artist', async () => {
        const newSong = {
            name: "So Cold",
            artist: "",
            album: "We Are Not Alone",
            duration: 273000,
            year: 2004
        };

        const response = await request(app)
            .post('/api/songs')
            .send(newSong);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            statusCode: 400,
            statusDescription: 'Bad Request',
            message: "must NOT have fewer than 1 characters"
        });
    });

    test('[400] should return validation error for missing duration', async () => {
        const newSong = {
            name: "So Cold",
            artist: "Breaking Benjamin",
            album: "We Are Not Alone",
            year: 2004
        };

        const response = await request(app)
            .post('/api/songs')
            .send(newSong);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            statusCode: 400,
            statusDescription: 'Bad Request',
            message: "must have required property 'duration'"
        });
    });

    test('[400] should return validation error for invalid duration', async () => {
        const newSong = {
            name: "So Cold",
            artist: "Breaking Benjamin",
            album: "We Are Not Alone",
            duration: 0,
            year: 2004
        };

        const response = await request(app)
            .post('/api/songs')
            .send(newSong);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            statusCode: 400,
            statusDescription: 'Bad Request',
            message: "must be >= 1"
        });
    });
});
