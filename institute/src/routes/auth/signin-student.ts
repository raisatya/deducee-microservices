import express, { Request, Response } from "express";
import { NotFoundError } from "@srdeducee/commonlib";

import { Institute } from "../../models/Institute";
import { Student } from "../../models/users/Student";

const router = express.Router();

router.get(
  "/api/institute/users/signin/student",
  async (req: Request, res: Response) => {
    let student = [],
      institute = [];

    while (student.length === 0) {
      institute = await Institute.aggregate([{ $sample: { size: 1 } }]);

      if (!institute) {
        throw new NotFoundError();
      }

      student = await Student.aggregate([
        {
          $match: {
            instituteId: institute[0].instituteId,
          },
        },
        { $sample: { size: 1 } },
      ]);
    }

    if (student.length === 0) {
      throw new NotFoundError();
    }

    const instituteDetails = institute[0];
    const userDetails = student[0];

    const userData = {
      instituteName: instituteDetails.instituteName,
      currentSession: instituteDetails.currentSession,
      sessions: instituteDetails.sessions,
      fullName: userDetails.fullName,
      instituteId: userDetails.instituteId,
      role: userDetails.role,
      classroomId: userDetails.classroomId,
      classroomName: userDetails.classroomName,
      rollNo: userDetails.rollNo,
      gender: userDetails.gender,
      dateOfBirth: userDetails.dateOfBirth,
      joinedOn: userDetails.joinedOn,
      contactNo: userDetails.contactNo,
      fatherName: userDetails.fatherName,
      fatherContactNo: userDetails.fatherContactNo,
      motherName: userDetails.motherName,
      motherContactNo: userDetails.motherContactNo,
    };

    return res.status(201).send(userData);
  }
);

export { router as signinStudentRouter };
