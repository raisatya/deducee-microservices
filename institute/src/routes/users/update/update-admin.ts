import express, { Request, Response } from "express";
import { BadRequestError, validateRequest } from "@srdeducee/commonlib";
import { body } from "express-validator";

import { Admin } from "../../../models/users/Admin";

const router = express.Router();

router.post(
  "/api/institute/users/:id/updateAdmin",
  [body("fullName").not().isEmpty().withMessage("Name must not be empty")],
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
      emailId,
    } = req.body;

    const existingAdmin = await Admin.findById(req.params.id);

    if (!existingAdmin) {
      throw new BadRequestError("[Institute] Admin Not Found");
    }

    existingAdmin.fullName = fullName;
    existingAdmin.gender = gender;
    existingAdmin.designation = designation;
    existingAdmin.qualifications = qualifications;
    existingAdmin.dateOfBirth = dateOfBirth;
    existingAdmin.joinedOn = joinedOn;
    existingAdmin.contactNo = contactNo;
    existingAdmin.emailId = emailId;

    await existingAdmin.save();

    return res.status(201).send(existingAdmin);
  }
);

export { router as updateAdminRouter };
