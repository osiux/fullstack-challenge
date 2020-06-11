import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';

dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(express.static('client'));

app.get('/', function (req: Request, res: Response) {
    res.sendFile('client/index.html', { root: __dirname });
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
