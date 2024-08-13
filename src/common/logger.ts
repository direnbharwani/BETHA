import path from 'path';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

/* ------------------------------------------------------------------------- */

// Winston is used as a logger for general logging
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message}) => {
            return `[${level}] ${timestamp} : ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console({                        // Logs to console
            silent: process.env.NODE_ENV === 'test'
        }),
        new DailyRotateFile({                               // Logs to file through DailyRotateFile
            filename: path.join('logs', 'app-%DATE%.log'),  // Distinguish log files by date
            datePattern: 'YYYY-MM-DD',
            maxFiles: '1d',                                 // Keep files for 1 day
            silent: process.env.NODE_ENV === 'test'
        })
    ]
})

/* ------------------------------------------------------------------------- */

export default logger;
