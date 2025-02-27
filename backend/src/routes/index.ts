import { Router } from 'express';
import { tenantRouter } from '../api/tenants';
import { paymentLogRouter } from '../api/payment';
import { miscRouter } from '../api/misc';

const router = Router();

router.use('/tenants', tenantRouter);
router.use('/payments', paymentLogRouter);
router.use('/misc', miscRouter);

export default router;
