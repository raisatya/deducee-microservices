import express, { Request, Response } from "express";
import { BadRequestError, validateRequest } from "@srdeducee/commonlib";
import { body } from "express-validator";

import { Institute } from "../../models/Institute";
import { Teacher } from "../../models/users/Teacher";

const router = express.Router();

router.post(
  "/api/institute/:instituteId/users/registerTeacher",
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
      emailId,
    } = req.body;

    const existingInstitute = await Institute.findOne({ instituteId: req.params.instituteId });
    if (!existingInstitute) {
      throw new BadRequestError("[Institute] Institute Not Found");
    }

    const teacher = Teacher.build({
      fullName,
      instituteId: req.params.instituteId,
      role: "teacher",
      gender,
      designation,
      qualifications,
      dateOfBirth,
      joinedOn,
      contactNo,
      emailId,
    });
    await teacher.save();

    return res.status(201).send(teacher);
  }
);

export { router as registerTeacherRouter };
