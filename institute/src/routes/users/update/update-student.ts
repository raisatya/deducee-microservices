import express, { Request, Response } from "express";
import { BadRequestError, validateRequest } from "@srdeducee/commonlib";
import { body } from "express-validator";

import { Student } from "../../../models/users/Student";
//import { Classroom } from "../../../models/classroom/Classroom";

const router = express.Router();

router.post(
  "/api/institute/users/:id/updateStudent",
  [body("dateOfBirth").not().isEmpty().withMessage("Date of birth must not be empty")],
  [body("fatherName").not().isEmpty().withMessage("Father's name must not be empty")],
  [body("motherName").not().isEmpty().withMessage("Mother's name must not be empty")],
  [body("contactNo").not().isEmpty().withMessage("Contact number must not be empty")],
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      gender,
      dateOfBirth,
      joinedOn,
      contactNo,
      fatherName,
      fatherContactNo,
      motherName,
      motherContactNo,
    } = req.body;

    const existingStudent = await Student.findById(req.params.id);

    if (!existingStudent) {
      throw new BadRequestError("[Institute] Student Not Found");
    }

    existingStudent.gender = gender;
    existingStudent.dateOfBirth = dateOfBirth;
    existingStudent.joinedOn = joinedOn;
    existingStudent.contactNo = contactNo;
    existingStudent.fatherName = fatherName;
    existingStudent.fatherContactNo = fatherContactNo;
    existingStudent.motherName = motherName;
    existingStudent.motherContactNo = motherContactNo;

    await existingStudent.save();
/*
    const existingClassroomDoc = await Classroom.findOne({
      _id: existingStudent.classroomId,
    });

    if (!existingClassroomDoc) {
      throw new BadRequestError("[Classroom] Classroom not found.");
    }

    let NumberOfStudents = existingClassroomDoc.students.length;
    if (NumberOfStudents !== 0) {
      for (let i = 0; i < NumberOfStudents; i++) {
        if (existingClassroomDoc.students[i]._id == existingStudent.id) {
          existingClassroomDoc.students[i] = {
            _id: existingStudent.id,
            fullName: existingStudent.fullName,
            rollNo: existingStudent.rollNo,
            gender,
            dateOfBirth,
            joinedOn,
            contactNo,
            fatherName,
            fatherContactNo,
            motherName,
            motherContactNo,
          };
          break;
        }
      }
    }

    await existingClassroomDoc.save();
*/
    return res.status(201).send(existingStudent);
  }
);

export { router as updateStudentRouter };
