import { Router } from 'express';
import { designRouter } from '../api/design';
import { userRouter } from '../api/users';

const router = Router();

// new

router.use('/users', userRouter);
router.use('/designs', designRouter);

export default router;
