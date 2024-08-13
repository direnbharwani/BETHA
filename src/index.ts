import express from 'express';
import morgan from 'morgan';

import logger from './common/logger';
import songData from './data/songData';

/* ------------------------------------------------------------------------- */

// Define constants
const app = express();
const PORT = process.env.PORT || 3000;

/* ------------------------------------------------------------------------- */

// Use morgan for HTTP request logging
// 'combined' is a format for logging the details of request (easy)
app.use(morgan('combined', {
    stream: {
        write: (message: any) => logger.info(message.trim())
    }
}));

app.use(express.json());

/* ------------------------------------------------------------------------- */

// GET endpoint (all songs)
app.get('/songs', (request, response) => {
    response.status(200).json(songData);
    logger.info('Fetched all songs');
});

// GET endpoint (by song id)
app.get('/songs/:id', (request, response) => {

    const songId = parseInt(request.params.id);
    if (isNaN(songId) == true) {                            // Ensure songId is actually a number
        logger.warn(`Request param ${request.params.id} is not a number`);
        return response.status(400).json({
            statusCode: 400,
            statusDescription: 'Bad Request',
            message: 'Invalid ID.'
        });
    }

    const song = songData.find((item: any) => item.id === songId);
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

// Listen for requests
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export default app;




