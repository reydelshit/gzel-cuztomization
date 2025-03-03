import { Router } from 'express';
import { designRouter } from '../api/design';
import { userRouter } from '../api/users';
import { ordersRouter } from '../api/orders';

const router = Router();

// new

router.use('/users', userRouter);
router.use('/designs', designRouter);
router.use('/orders', ordersRouter);

export default router;
