import express, { Request, Response } from "express";

import { ExamData } from "../../models/ExamData";
import { BadRequestError } from "@srdeducee/commonlib";

const router = express.Router();

router.get(
  "/api/classroom/:instituteId/:session/:classroomId/:examId/examinationdata",
  async (req: Request, res: Response) => {
    const examDataDoc = await ExamData.findOne({
        _id: req.params.examId,
      instituteId: req.params.instituteId,
      session: req.params.session,
      classroomId: req.params.classroomId,
    });

    if(!examDataDoc) {
      throw new BadRequestError("[Classroom] Examination not registered.")
    }

    return res.status(200).send(examDataDoc);
  }
);

export { router as readOneExamDataRouter };
