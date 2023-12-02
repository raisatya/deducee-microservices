import express, { Request, Response } from "express";

import { ExamData } from "../../models/ExamData";

const router = express.Router();

router.get(
  "/api/classroom/:instituteId/:session/:classroomId/examinationdata",
  async (req: Request, res: Response) => {
    const examDataDoc = await ExamData.find({
      instituteId: req.params.instituteId,
      session: req.params.session,
      classroomId: req.params.classroomId
    });

    return res.status(200).send(examDataDoc);
  }
);

export { router as readAllExamDataRouter };
