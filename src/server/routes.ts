import { Router } from 'express';

import { SearchController } from './controllers/SearchController';
import { TourController } from './controllers/TourController';

const router = Router();

router.get('/search', SearchController.search);
router.get('/business/:businessId', SearchController.business);

router.get('/user/:userId/tours', TourController.fetchTours);

router.post('/tours', TourController.saveTour);
router.get('/tours/:tourId', TourController.fetchTour);
router.get('/tours/:tourId/download', TourController.download);

export default router;
