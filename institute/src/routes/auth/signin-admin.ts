import express, { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "@srdeducee/commonlib";
import jwt from "jsonwebtoken";

import { Institute } from "../../models/Institute";
import { Admin } from "../../models/users/Admin";

const router = express.Router();
const JWT_KEY = "abcd";

router.get(
  "/api/institute/users/signin/admin",
  async (req: Request, res: Response) => {
    let admin = [],
      institute = [];

    while (admin.length === 0) {
      institute = await Institute.aggregate([{ $sample: { size: 1 } }]);

      if (!institute) {
        throw new NotFoundError();
      }

      admin = await Admin.aggregate([
        {
          $match: {
            instituteId: institute[0].instituteId,
          },
        },
        { $sample: { size: 1 } },
      ]);
    }

    if (admin.length === 0) {
      throw new NotFoundError();
    }

    const instituteDetails = institute[0];
    const userDetails = admin[0];

    const userData = {
      instituteName: instituteDetails.instituteName,
      currentSession: instituteDetails.currentSession,
      sessions: instituteDetails.sessions,
      fullName: userDetails.fullName,
      instituteId: userDetails.instituteId,
      role: userDetails.role,
      userId: userDetails._id,
      gender: userDetails.gender,
      designation: userDetails.designation,
      qualifications: userDetails.qualifications,
      dateOfBirth: userDetails.dateOfBirth,
      joinedOn: userDetails.joinedOn,
      contactNo: userDetails.contactNo,
      emailId: userDetails.emailId,
    };

    return res.status(201).send(userData);
  }
);

export { router as signinAdminRouter };

/**
 * 
    const userJwt = jwt.sign(
      {
        instituteName: instituteDetails.instituteName,
        fullName: userDetails.fullName,
        uniqueId: userDetails.uniqueId,
        instituteId: userDetails.instituteId,
        role: userDetails.role,
        authorizedClassrooms: userDetails.authorizedClassrooms
      },
      JWT_KEY
    );
    req.session = {
      jwt: userJwt,
    };
 */
