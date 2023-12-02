import express, { Request, Response } from "express";

import { ClassroomNotices } from "../../models/ClassroomNotices";

const router = express.Router();

router.get(
  "/api/notices/classroomnotices/:instituteId/:classroomId/:session",
  async (req: Request, res: Response) => {
    const classroomNotices = await ClassroomNotices.find({
      instituteId: req.params.instituteId,
      session: req.params.session,
      designatedClassroom: req.params.classroomId
    }).sort({ createdAt: 'desc'});

    return res.status(200).send(classroomNotices);
  }
);

export { router as readClassroomNoticesRouter };
