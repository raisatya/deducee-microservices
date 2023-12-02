import express, { Request, Response } from "express";
import { BadRequestError, validateRequest } from "@srdeducee/commonlib";
import { body } from "express-validator";

import { Student } from "../../../models/users/Student";
/*Nats needed
import { Classroom } from "../../../models/classroom/Classroom";
import { Attendance } from "../../../models/classroom/Attendance";
*/

const router = express.Router();

router.post(
  "/api/institute/:instituteId/:session/:classroomId/users/registerStudent",
  [
    body("newClassroomId")
      .not()
      .isEmpty()
      .withMessage("Classroom Id must not be empty"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { newClassroomId, detailedAttendanceArray } = req.body;

    const existingStudent = await Student.findOne({
      instituteId: req.params.instituteId,
      classroomId: req.params.classroomId,
    });

    if (!existingStudent) {
      throw new BadRequestError("[Institute] Student Not Found");
    }

    existingStudent.classroomId = newClassroomId;

    await existingStudent.save();
/*
    const existingClassroom = await Classroom.findOne({
      _id: newClassroomId,
    });

    if (!existingClassroom) {
      throw new BadRequestError("[Classroom] Classroom does not exist");
    }

    existingClassroom.students.push({
      _id: existingStudent.id,
      fullName: existingStudent.fullName,
      rollNo: existingStudent.rollNo,
      gender: existingStudent.gender,
      dateOfBirth: existingStudent.dateOfBirth,
      joinedOn: existingStudent.joinedOn,
      contactNo: existingStudent.contactNo,
      fatherName: existingStudent.fatherName,
      fatherContactNo: existingStudent.fatherContactNo,
      motherName: existingStudent.motherName,
      motherContactNo: existingStudent.motherContactNo,
    });

    await existingClassroom.save();

    const attendanceAccount = Attendance.build({
      instituteId: req.params.instituteId,
      session: req.params.session,
      classroomId: existingClassroom.id,
      classroomName: existingClassroom.classroomName,
      studentName: existingStudent.fullName,
      rollNo: existingStudent.rollNo,
      studentId: existingStudent.id,
      totalClasses: 0,
      totalClassesAttended: 0,
      detailedAttendanceArray,
    });

    await attendanceAccount.save();
*/
    return res.status(201).send(existingStudent);
  }
);

export { router as promoteStudentRouter };
