import { Router } from "express";
import Ajv from "ajv";

import logger from "../common/logger";
import { RouteConfig } from "../common/types";
import songSchema from "../schemas/songSchema";

/* ------------------------------------------------------------------------- */

const endpoint = '/songs';

export const songsRouter : RouteConfig = (router: Router, data: any) => {

    const ajv = new Ajv();
    const validator = ajv.compile(songSchema);  // Compiled schema to use for validation on POST requests

    let nextId = data.length ? data[data.length - 1].id + 1 : 1;

    // GET endpoint (all songs)
    router.get(`${endpoint}`, (request, response) => {
        logger.info('Fetched all songs');
        return response.status(200).json(data);
    });

    // GET endpoint (by song id)
    router.get(`${endpoint}/:id`, (request, response) => {
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
        if (!song) {
            logger.warn(`Song with id ${songId} not found`);
            return response.status(404).json({
                statusCode: 404,
                statusDescription: 'Not Found',
                message: 'Song not found.'
            });
        }

        logger.info(`Fetching song with id ${songId}`);
        return response.status(200).json(song);
    });

    // POST endpoint
    router.post(`${endpoint}`, (request, response) => {
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
            id: nextId++,
            ...request.body
        };
        data.push(newSong);

        logger.info(`Successfully added new song with id ${newSong.id}`);
        return response.status(201).json({
            statusCode: 201,
            statusDescription: 'Created',
            message: 'Song added.'
        });
    })

    // DELETE endpoint
    router.delete(`${endpoint}/:id`, (request, response) => {
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

        const songIndex = data.findIndex((item: any) => item.id === songId);
        if (songIndex === -1)
        {
            logger.warn(`Song with id ${songId} not found`);
            return response.status(404).json({
                statusCode: 404,
                statusDescription: 'Not Found',
                message: 'Song not found.'
            });
        }

        data.splice(songIndex, 1);

        logger.info(`Successfully deleted song with id ${songId}`);
        return response.status(200).json({
            statusCode: 200,
            statusDescription: 'OK',
            message: 'Song deleted.'
        });
    })
}
