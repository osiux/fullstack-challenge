import { Router, Request, Response } from 'express';

import { SearchController } from './controllers/SearchController';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.json({
        hello: 'world',
    });
});

router.get('/search', SearchController.search);

router.get('/business/:businessId', SearchController.business);

export default router;
