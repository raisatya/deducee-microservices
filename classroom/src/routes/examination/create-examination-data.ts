import express, { Request, Response } from "express";
import { BadRequestError, validateRequest } from "@srdeducee/commonlib";
import { body } from "express-validator";

import { ExamData } from "../../models/ExamData";
import { Classroom } from "../../models/Classroom";

const router = express.Router();

router.post(
  "/api/classroom/:instituteId/:session/:classroomId/examinationdata/create",
  [
    body("examinationName")
      .not()
      .isEmpty()
      .withMessage("Subject Name must not be empty"),
    body("grandTotal")
      .not()
      .isEmpty()
      .withMessage("Grand Total must not be empty")
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { examinationName, grandTotal, examinationSubjects, createdById, createdByName } = req.body;

    const existingClassroom = await Classroom.findOne({
      _id: req.params.classroomId,
      instituteId: req.params.instituteId,
      session: req.params.session,
      disabled: false
    })

    if(!existingClassroom) {
      throw new BadRequestError("[Classroom] No such classroom exists.")
    }

    const existingExamDoc = await ExamData.findOne({
      instituteId: req.params.instituteId,
      classroomId: req.params.classroomId,
      session: req.params.session,
      examinationName,
    });

    if (existingExamDoc) {
      throw new BadRequestError("[Classroom] Examination Data already registered.");
    }

    const newExamDoc = ExamData.build({
      instituteId: req.params.instituteId,
      session: req.params.session,
      classroomId: req.params.classroomId,
      examinationName,
      grandTotal,
      createdById,
      createdByName,
      examinationSubjects,
    });
    
    await newExamDoc.save();

    return res.status(201).send(newExamDoc);
  }
);

export { router as createExamDataRouter };
