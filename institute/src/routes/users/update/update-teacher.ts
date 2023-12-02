import express, { Request, Response } from "express";
import { BadRequestError, validateRequest } from "@srdeducee/commonlib";
import { body } from "express-validator";

import { Teacher } from "../../../models/users/Teacher";

const router = express.Router();

router.post(
  "/api/institute/users/:id/updateTeacher",
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

    const existingTeacher = await Teacher.findById(req.params.id);

    if (!existingTeacher) {
      throw new BadRequestError("[Institute] Teacher Not Found");
    }

    existingTeacher.fullName = fullName;
    existingTeacher.gender = gender;
    existingTeacher.designation = designation;
    existingTeacher.qualifications = qualifications;
    existingTeacher.dateOfBirth = dateOfBirth;
    existingTeacher.joinedOn = joinedOn;
    existingTeacher.contactNo = contactNo;
    existingTeacher.emailId = emailId;

    await existingTeacher.save();

    return res.status(201).send(existingTeacher);
  }
);

export { router as updateTeacherRouter };
