import express, { Router } from 'express';
import fs from 'fs';
import morgan from 'morgan';

import logger from './common/logger';
import { dataLoader } from './data/dataLoader';
import { AppConfig } from './common/types';

/* ------------------------------------------------------------------------- */

/**
 * Creates an application based on configuration parameters.
 * @param config The configuration for each route of the application. Supports dependency injection for the data source.
 * @returns A new application
 */
export const createApp = (config: AppConfig[]) => {
    const app = express();
    app.use(express.json());    // Middleware to parse JSON

    // Use morgan for HTTP request logging
    // 'combined' is a format for logging the details of request (easy)
    app.use(morgan('combined', {
        stream: {
            write: (message: any) => logger.info(message.trim())
        }
    }));

    // Set up routes dynamically
    config.forEach(({ route, filename, fsModule = fs}) => {
        const router = Router();
        const data = dataLoader(fsModule, filename);
        route(router, data);
        app.use('/api', router);
    })

    return app;
}
