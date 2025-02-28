import { Router } from 'express';
import { tenantRouter } from '../api/tenants';
import { paymentLogRouter } from '../api/payment';
import { miscRouter } from '../api/misc';
import { userRouter } from '../api/users';
import { designRouter } from '../api/design';

const router = Router();

router.use('/tenants', tenantRouter);
router.use('/payments', paymentLogRouter);
router.use('/misc', miscRouter);

// new

router.use('/users', userRouter);
router.use('/designs', designRouter);

export default router;
