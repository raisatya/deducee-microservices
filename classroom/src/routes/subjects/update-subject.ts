//Use Find Index
import express, { Request, Response } from "express";
import { BadRequestError, validateRequest } from "@srdeducee/commonlib";
import { body } from "express-validator";

import { Classroom } from "../../models/Classroom";

const router = express.Router();

router.post(
  "/api/classroom/:instituteId/:session/:classroomId/subject/update",
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
    const { subjectName, subjectCode, assignedTeacherName, assignedTeacherId } = req.body;

    const existingClassroomDoc = await Classroom.findOne({
        _id: req.params.classroomId,
      instituteId: req.params.instituteId,
      session: req.params.session,
      disabled: false
    });

    if (!existingClassroomDoc) {
      throw new BadRequestError("[Classroom] Classroom not found");
    }

    let NumberOfSubjects = existingClassroomDoc.subjects.length;
    if (NumberOfSubjects !== 0) {
      for (let i = 0; i < NumberOfSubjects; i++) {
        if (existingClassroomDoc.subjects[i].subjectCode == subjectCode) {
          existingClassroomDoc.subjects[i] = {
            subjectName,
            subjectCode,
            assignedTeacherId,
            assignedTeacherName,
          };
          break;
        }
      }
    }

    await existingClassroomDoc.save();

    return res.status(201).send(existingClassroomDoc);
  }
);

export { router as updateSubjectRouter };
