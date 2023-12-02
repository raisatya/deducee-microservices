import express, { Request, Response } from 'express';

import { Admin } from '../../models/users/Admin';

const router = express.Router();

router.get('/api/institute/:instituteId/admins', async (req: Request, res: Response) => {
    const admins = await Admin.find({ instituteId: req.params.instituteId });

    return res.status(200).send(admins);
})

export { router as readAdminsRouter };