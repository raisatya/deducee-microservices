import express, { Request, Response } from "express";
import { BadRequestError, validateRequest } from "@srdeducee/commonlib";
import { body } from "express-validator";

import { Classroom } from "../../models/Classroom";

const router = express.Router();

router.post(
  "/api/classroom/:instituteId/:session/:classroomId/subject/create",
  [
    body("subjectName")
      .not()
      .isEmpty()
      .withMessage("Subject Name must not be empty"),
    body("subjectCode")
      .not()
      .isEmpty()
      .withMessage("Subject Code must not be empty"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { subjectName, subjectCode, assignedTeacherName, assignedTeacherId } =
      req.body;

    const existingClassroomDoc = await Classroom.findOne({
      _id: req.params.classroomId,
      instituteId: req.params.instituteId,
      session: req.params.session,
      disabled: false,
    });

    if (!existingClassroomDoc) {
      throw new BadRequestError("[Classroom] Classroom not found");
    }

    if (existingClassroomDoc.subjects.length !== 0) {
      existingClassroomDoc.subjects.map((item) => {
        if (
          item.subjectCode == subjectCode ||
          item.subjectName == subjectName
        ) {
          throw new BadRequestError("[Classroom] Subject already registered");
        }
      });
    }

    existingClassroomDoc.subjects.push({
      subjectName,
      subjectCode,
      assignedTeacherName,
      assignedTeacherId,
    });

    await existingClassroomDoc.save();

    return res.status(201).send(existingClassroomDoc);
  }
);

export { router as createSubjectRouter };
