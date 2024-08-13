import express from 'express';
import morgan from 'morgan';

import logger from './common/logger';
import songsRouter from './routes/songs';

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
app.use('/api', songsRouter);

/* ------------------------------------------------------------------------- */

// Listen for requests
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export default app;




