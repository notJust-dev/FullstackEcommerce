import { Router } from 'express';
import { createPaymentIntent, getKeys } from './stripeController';
import { verifyToken } from '../../middlewares/authMiddleware.js';

const router = Router();

// Note: Guests can get the publishable key
router.get('/keys', getKeys);

router.post('/payment-intent', verifyToken, createPaymentIntent);

export default router;
