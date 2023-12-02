import express, { Request, Response } from "express";

import { ExamStats } from "../../models/ExamStats";

const router = express.Router();

router.get(
  "/api/classroom/:instituteId/:session/:classroomId/:examId/read/students/examinationstats",
  async (req: Request, res: Response) => {
    const examStatsDoc = await ExamStats.find({
      instituteId: req.params.instituteId,
      session: req.params.session,
      classroomId: req.params.classroomId,
      examId: req.params.examId,
    });

    return res.status(200).send(examStatsDoc);
  }
);

export { router as readAllStudentsExamStatsRouter };
