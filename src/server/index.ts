import 'reflect-metadata';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';
import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createConnection } from 'typeorm';

import routes from './routes';

import { Tour } from './entity/Tour';
import { Place } from './entity/Place';

dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const server = express();

createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [Tour, Place],
    // synchronize: true,
    // migrationsTableName: 'migrations',
    // migrations: ['migrations/*.ts'],
})
    .then(async () => {
        server.use(morgan('dev'));
        server.use(helmet());
        server.use(cors());
        server.use(express.json());

        server.use(express.static(path.resolve('dist/client')));

        // API routes
        server.use('/api', routes);

        // Serve index from client app
        server.get('*', (req: Request, res: Response) => {
            res.sendFile(path.join(__dirname, 'app/dist/client/index.html'));
        });

        server.listen(PORT, () => {
            console.log(`🚀 Server started at http://localhost:${PORT}`);
        });
    })
    .catch((error) => console.log(error));

export { server };
