import express from 'express';
import { index, show, destroy, addReview } from '../controllers/movieController.js';

const router = express.Router();


router.get('/', index);


router.get('/:id', show);


router.delete('/:id', destroy);


router.post('/:id/reviews', addReview);

export default router;
