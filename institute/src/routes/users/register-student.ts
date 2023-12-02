import mongoose from "mongoose";
import express, { Request, Response } from "express";
import { BadRequestError, validateRequest } from "@srdeducee/commonlib";
import { body } from "express-validator";

import { Institute } from "../../models/Institute";
import { Student } from "../../models/users/Student";
/*
import { Classroom } from "../../../models/classroom/Classroom";
import { Attendance } from "../../../models/classroom/Attendance";
*/
const router = express.Router();

router.post(
  "/api/institute/:instituteId/:classroomId/users/registerStudent",
  [
    body("fullName").not().isEmpty().withMessage("Name must not be empty"),
    body("classroomName")
      .not()
      .isEmpty()
      .withMessage("Classroom Name must not be empty"),
    body("rollNo").not().isEmpty().withMessage("Roll No must not be empty"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      fullName,
      classroomName,
      rollNo,
      gender,
      dateOfBirth,
      joinedOn,
      contactNo,
      fatherName,
      fatherContactNo,
      motherName,
      motherContactNo,
      detailedAttendanceArray,
    } = req.body;

    const existingInstitute = await Institute.findOne({
      instituteId: req.params.instituteId,
    });
    if (!existingInstitute) {
      throw new BadRequestError("[Institute] Institute Not Found");
    }

    if (!existingInstitute.classrooms.includes(req.params.classroomId)) {
      throw new BadRequestError("[Classroom] Classroom Not Found");
    }

    const existingStudentDoc = await Student.findOne({
      classroomId: req.params.classroomId,
      rollNo,
    });

    if (existingStudentDoc) {
      throw new BadRequestError("[Institute] Student already registered");
    }

    const studentDoc = Student.build({
      classroomId: req.params.classroomId,
      classroomName,
      fullName,
      instituteId: req.params.instituteId,
      rollNo,
      role: "student",
      gender,
      dateOfBirth,
      joinedOn,
      contactNo,
      fatherName,
      fatherContactNo,
      motherName,
      motherContactNo,
    });

    await studentDoc.save();
/*
    const existingClassroomDoc = await Classroom.findOne({
      _id: req.params.classroomId,
    });

    if (!existingClassroomDoc) {
      throw new BadRequestError("[Classroom] Classroom Not Found");
    }

    existingClassroomDoc.students.push({
      _id: studentDoc.id,
      fullName,
      rollNo,
      gender,
      dateOfBirth,
      joinedOn,
      contactNo,
      fatherName,
      fatherContactNo,
      motherName,
      motherContactNo,
    });

    await existingClassroomDoc.save();

    const attendanceDoc = Attendance.build({
      instituteId: req.params.instituteId,
      session: existingInstitute.currentSession,
      classroomId: existingClassroomDoc.id,
      classroomName,
      studentName: fullName,
      rollNo,
      studentId: studentDoc.id,
      totalClasses: 0,
      totalClassesAttended: 0,
      detailedAttendanceArray,
    });

    await attendanceDoc.save();

    const savedData = {
      studentDoc,
      existingClassroomDoc,
      attendanceDoc,
    };
*/
    return res.status(201).send(studentDoc);
  }
);

export { router as registerStudentRouter };
