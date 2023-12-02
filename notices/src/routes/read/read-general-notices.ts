import express, { Request, Response } from "express";

import { GeneralNotices } from "../../models/GeneralNotices";

const router = express.Router();

router.get('/api/notices/generalnotices/:instituteId/:session', async (req: Request, res: Response) => {

    const generalNotices = await GeneralNotices.find({ 
        instituteId: req.params.instituteId,
        session: req.params.session
    }).sort({ createdAt: 'desc'});

    return res.status(200).send(generalNotices);
});

export { router as readGeneralNoticesRouter };