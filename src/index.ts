import { createApp } from './app';
import { AppConfig } from './common/types';
import { songsRouter } from './routes/songs';

/* ------------------------------------------------------------------------- */

// Create application
const appConfig: AppConfig[] = [
    {
        route: songsRouter,
        filename: 'songData.json'
    }
];

const app = createApp(appConfig);

// Listen for requests
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

/* ------------------------------------------------------------------------- */

export default app;




