import 'reflect-metadata';
import * as dotenv from 'dotenv';
import * as path from 'path';
import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createConnection } from 'typeorm';

import routes from './routes';

dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const allowedDomains = [
    'localhost:3000',
    'tourpicker.herokuapp.com',
];
const corsOptions = {
    origin: (
        origin: string | undefined,
        callback: (err: Error | null, allow?: boolean) => void
    ) => {
        if(!origin) return callback(null, true);

        if (allowedDomains.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

const server = express();

createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
})
    .then(async () => {
        server.use(morgan('dev'));
        server.use(helmet());
        server.use(cors(corsOptions));
        server.use(express.json());

        server.use(express.static(path.resolve('dist/client')));

        // Serve index from client app
        server.get('/', (req: Request, res: Response) => {
            console.log(path.resolve(__dirname));
            res.sendFile('dist/client/index.html', { root: __dirname });
        });

        // API routes
        server.use('/api', routes);

        server.listen(PORT, () => {
            console.log(`🚀 Server started at http://localhost:${PORT}`);
        });
    })
    .catch((error) => console.log(error));

export { server };
