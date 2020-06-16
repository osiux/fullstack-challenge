import { Router } from 'express';

import { SearchController } from './controllers/SearchController';

const router = Router();

router.get('/search', SearchController.search);

router.get('/business/:businessId', SearchController.business);

export default router;
