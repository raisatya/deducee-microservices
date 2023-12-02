import express, { Request, Response } from "express";
import { BadRequestError, validateRequest } from "@srdeducee/commonlib";
import { body } from "express-validator";

import { Institute } from "../../models/Institute";
import { Admin } from "../../models/users/Admin";

const router = express.Router();

router.post(
  "/api/institute/:instituteId/users/registerAdmin",
  [
    body("fullName").not().isEmpty().withMessage("Name must not be empty"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { 
      fullName, 
      gender, 
      designation, 
      qualifications, 
      dateOfBirth, 
      joinedOn, 
      contactNo, 
      emailId 
    } = req.body;

    const existingInstitute = await Institute.findOne({
      instituteId: req.params.instituteId,
    });
    if (!existingInstitute) {
      throw new BadRequestError("[Institute] Institute Not Found");
    }

    const admin = Admin.build({
      fullName,
      instituteId: req.params.instituteId,
      role: "admin",
      gender,
      designation,
      qualifications,
      dateOfBirth,
      joinedOn,
      contactNo,
      emailId,
    });
    await admin.save();

    return res.status(201).send(admin);
  }
);

export { router as registerAdminRouter };
