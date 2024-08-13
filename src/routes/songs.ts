import { Router } from "express";
import fs from 'fs';

import logger from "../common/logger";
import { dataLoader } from "../data/dataLoader";

/* ------------------------------------------------------------------------- */

const router = Router();
const data = dataLoader(fs, 'songData.json');

/* ------------------------------------------------------------------------- */

// GET endpoint (all songs)
router.get('/songs', (request, response) => {
    response.status(200).json(data);
    logger.info('Fetched all songs');
});

// GET endpoint (by song id)
router.get('/songs/:id', (request, response) => {

    const songId = parseInt(request.params.id);
    if (isNaN(songId) == true) {                            // Ensure songId is actually a number
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

/* ------------------------------------------------------------------------- */

export default router;
