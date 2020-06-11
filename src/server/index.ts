import * as dotenv from 'dotenv';
import * as path from 'path';
import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve('dist/client')));

app.get('/', function (req: Request, res: Response) {
    console.log(path.resolve(__dirname));
    res.sendFile('dist/client/index.html', { root: __dirname });
});

app.get('/api', function (req: Request, res: Response) {
    res.json({
        hello: 'world',
    });
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
