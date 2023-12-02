import express, { Request, Response } from "express";
import { BadRequestError, validateRequest } from "@srdeducee/commonlib";
import { body } from "express-validator";

import { Attendance } from "../../models/Attendance";

const router = express.Router();

router.post(
  "/api/classroom/:instituteId/:session/:classroomId/:studentId/attendance/create",
  [
    body("subjectName")
      .not()
      .isEmpty()
      .withMessage("Subject Name must not be empty"),
    body("subjectCode")
      .not()
      .isEmpty()
      .withMessage("Subject Code must not be empty"),
    body("isPresent")
      .not()
      .isEmpty()
      .withMessage("isPresent must not be empty"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      attendanceTakenOn,
      attendanceTakenById,
      attendanceTakenByName,
      subjectName,
      subjectCode,
      isPresent
    } = req.body;

    const existingAttendanceDoc = await Attendance.findOne({
      instituteId: req.params.instituteId,
      classroomId: req.params.classroomId,
      session: req.params.session,
      studentId: req.params.studentId,
    });

    if (!existingAttendanceDoc) {
      throw new BadRequestError("[Classroom] Student not found");
    }

      existingAttendanceDoc.totalClasses =
        existingAttendanceDoc.totalClasses + 1;
      if (isPresent == true) {
        existingAttendanceDoc.totalClassesAttended += 1;
      }

      existingAttendanceDoc.detailedAttendanceArray.push({
        attendanceTakenOn,
        attendanceTakenById,
        attendanceTakenByName,
        subjectName,
        subjectCode,
        isPresent,
      });

      existingAttendanceDoc.save();

      return res.status(201).send(existingAttendanceDoc);
  }
);

export { router as createAttendanceRouter };
