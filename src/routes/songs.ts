import { Router } from "express";
import Ajv from "ajv";

import logger from "../common/logger";
import { RouteConfig } from "../common/types";
import songSchema from "../schemas/songSchema";

/* ------------------------------------------------------------------------- */

export const songsRouter : RouteConfig = (router: Router, data: any) => {

    const ajv = new Ajv();
    const validator = ajv.compile(songSchema);  // Compiled schema to use for validation on POST requests

    // GET endpoint (all songs)
    router.get('/songs', (request, response) => {
        response.status(200).json(data);
        logger.info('Fetched all songs');
    });

    // GET endpoint (by song id)
    router.get('/songs/:id', (request, response) => {
        const songId = parseInt(request.params.id);

        // Ensure songId is actually a number
        if (isNaN(songId) == true) {
            logger.warn(`Request param ${request.params.id} is not a number`);
            return response.status(400).json({
                statusCode: 400,
                statusDescription: 'Bad Request',
                message: 'Invalid ID.'
            });
        }

        const song = data.find((item: any) => item.id === songId);
        if (song) {
            logger.info(`Fetching song with id ${songId}`);
            response.status(200).json(song)
        } else {
            logger.warn(`Song with id ${songId} not found`);
            response.status(404).json({
                statusCode: 404,
                statusDescription: 'Not Found',
                message: 'Song not found.'
            });
        }

    });

    // POST endpoint
    router.post('/songs', (request, response) => {
        const isValid: boolean = validator(request.body);
        if (!isValid) {
            logger.warn(`Invalid POST request body`);
            return response.status(400).json({
                statusCode: 400,
                statusDescription: 'Bad Request',
                message: validator.errors?.[0].message
            });
        }

        const newSong = {
            id: data.length ? data[data.length - 1].id + 1 : 1,
            ...request.body
        };
        data.push(newSong);

        logger.info(`Successfully added new song entry with id ${newSong.id}`);
        response.status(201).json({
            statusCode: 201,
            statusDescription: 'Created',
            message: 'Song entry created.'
        })
    })
}
