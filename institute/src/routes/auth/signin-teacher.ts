import express, { Request, Response } from "express";
import { NotFoundError } from "@srdeducee/commonlib";

import { Institute } from "../../models/Institute";
import { Teacher } from "../../models/users/Teacher";

const router = express.Router();

router.get("/api/institute/users/signin/teacher", async (req: Request, res: Response) => {
  let teacher = [],
    institute = [];

  while (teacher.length === 0) {
    institute = await Institute.aggregate([{ $sample: { size: 1 } }]);

    if (!institute) {
      throw new NotFoundError();
    }

    teacher = await Teacher.aggregate([
      {
        $match: {
          instituteId: institute[0].instituteId,
        },
      },
      { $sample: { size: 1 } },
    ]);
  }

  if (teacher.length === 0) {
    throw new NotFoundError();
  }

  const instituteDetails = institute[0];
  const userDetails = teacher[0];

  const userData = {
    instituteName: instituteDetails.instituteName,
    currentSession: instituteDetails.currentSession,
    sessions: instituteDetails.sessions,
    fullName: userDetails.fullName,
    instituteId: userDetails.instituteId,
    role: userDetails.role,
    gender: userDetails.gender,
    designation: userDetails.designation,
    qualifications: userDetails.qualifications,
    dateOfBirth: userDetails.dateOfBirth,
    joinedOn: userDetails.joinedOn,
    contactNo: userDetails.contactNo,
    emailId: userDetails.emailId,
  };

  return res.status(201).send(userData);
});

export { router as signinTeacherRouter };