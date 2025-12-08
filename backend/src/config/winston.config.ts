import { WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';

export const winstonConfig: WinstonModuleOptions = {
  transports: [
    new winston.transports.Console({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        process.env.NODE_ENV === 'production'
          ? winston.format.json()
          : winston.format.combine(
              winston.format.colorize(),
              winston.format.printf(
                ({ timestamp, level, message, context, ...meta }) => {
                  const ctx = (context as string) || 'Application';
                  const metaString = Object.keys(meta).length
                    ? JSON.stringify(meta)
                    : '';
                  return `${timestamp as string} [${level}] [${ctx}] ${String(message)} ${metaString}`;
                },
              ),
            ),
      ),
    }),
  ],
};
