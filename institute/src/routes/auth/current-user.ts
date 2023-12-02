import { currentUser } from '@srdeducee/commonlib';

import express from 'express';

const router = express.Router();

router.get('/api/institute/users/currentUser', currentUser, (req, res) => {
  return res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };