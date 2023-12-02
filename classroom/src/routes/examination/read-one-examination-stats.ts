import express, { Request, Response } from "express";

import { ExamStats } from "../../models/ExamStats";

const router = express.Router();

router.get(
  "/api/classroom/:instituteId/:session/:classroomId/:examId/:studentId/examinationstats",
  async (req: Request, res: Response) => {
    const examStatsDoc = await ExamStats.findOne({
      instituteId: req.params.instituteId,
      session: req.params.session,
      classroomId: req.params.classroomId,
      examId: req.params.examId,
      studentId: req.params.studentId,
    });

    return res.status(200).send(examStatsDoc);
  }
);

export { router as readOneExamStatsRouter };
