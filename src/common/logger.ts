import path from 'path';
import winston, { LoggerOptions } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

/* ------------------------------------------------------------------------- */

const loggerTransports: winston.transport[] = [
    new winston.transports.Console({                        // Logs to console
        silent: process.env.NODE_ENV === 'test'
    })
];

if (process.env.NODE_ENV !== 'test') {
    loggerTransports.push(
        new DailyRotateFile({                                               // Logs to file through DailyRotateFile
            filename: path.join(process.cwd(), 'logs', 'app-%DATE%.log'),   // Distinguish log files by date
            datePattern: 'YYYY-MM-DD',
            maxFiles: '1d',                                                 // Keep files for 1 day
        })
    )
}

const loggerOptions: LoggerOptions = {
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message}) => {
            return `[${level}] ${timestamp} : ${message}`;
        })
    ),
    transports: loggerTransports
};

// Winston is used as a logger for general logging
const logger = winston.createLogger(loggerOptions);

/* ------------------------------------------------------------------------- */

export default logger;
