import { Router } from 'express';
import { designRouter } from '../api/design';
import { userRouter } from '../api/users';
import { ordersRouter } from '../api/orders';
import { notificationRouter } from '../api/notification';

const router = Router();

router.use('/users', userRouter);
router.use('/designs', designRouter);
router.use('/orders', ordersRouter);
router.use('/notif', notificationRouter);

export default router;
