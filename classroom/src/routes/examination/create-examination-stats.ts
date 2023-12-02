import express, { Request, Response } from "express";
import { BadRequestError, validateRequest } from "@srdeducee/commonlib";
import { body } from "express-validator";

import { ExamStats } from "../../models/ExamStats";

const router = express.Router();

router.post(
  "/api/classroom/:instituteId/:session/:classroomId/:examId/:studentId/examinationstats/create",
  [
    body("examinationName")
      .not()
      .isEmpty()
      .withMessage("Subject Name must not be empty"),
    body("grandTotal")
      .not()
      .isEmpty()
      .withMessage("Grand Total must not be empty"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { examinationName, studentName, rollNo, grandTotal, totalMarksObtained, subjectReports } = req.body;

    const existingExamDoc = await ExamStats.findOne({
        _id: req.params.examId,
      instituteId: req.params.instituteId,
      classroomId: req.params.classroomId,
      session: req.params.session,
      studentId: req.params.studentId
    });

    if (existingExamDoc) {
      throw new BadRequestError("[Classroom] Examination Stats already registered.");
    }

    const newExamStatsDoc = ExamStats.build({
      instituteId: req.params.instituteId,
      session: req.params.session,
      classroomId: req.params.classroomId,
      examId: req.params.examId,
      examinationName,
      studentName,
      rollNo,
      studentId: req.params.studentId,
      grandTotal,
      totalMarksObtained,
      subjectReports,
    });

    await newExamStatsDoc.save();

    return res.status(201).send(newExamStatsDoc);
  }
);

export { router as createExamStatsRouter };
