import express, { Request, Response } from "express";
import { BadRequestError, validateRequest } from "@srdeducee/commonlib";
import { body } from "express-validator";

import { Classroom } from "../../models/Classroom";
//import { NoticesClassroomList } from "../../../models/notices/NoticesClassroomList";
//import { Institute } from "../../../models/institute/Institute";

const router = express.Router();

router.post(
  "/api/classroom/:instituteId/:session/createClassroom",
  [
    body("classroomName")
      .not()
      .isEmpty()
      .withMessage("Classroom Name must not be empty")
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { classroomName, students, subjects } = req.body;

    const existingClassroom = await Classroom.findOne({
      instituteId: req.params.instituteId,
      classroomName,
      session: req.params.session
    });

    if (existingClassroom) {
      throw new BadRequestError("[Classroom] Classroom already registered");
    }

    const classroom = Classroom.build({
      instituteId: req.params.instituteId,
      session: req.params.session,
      classroomName,
      students,
      subjects,
    });

    await classroom.save();
/*
    const instituteDoc = await Institute.findOne({
      instituteId: req.params.instituteId
    });

    if (!instituteDoc) {
      throw new BadRequestError("[Institute] Institute not found");
    }

    instituteDoc.classrooms.push(classroom.id);

    await instituteDoc.save();

    const noticesClassroom = await NoticesClassroomList.findOne({
      instituteId: req.params.instituteId,
      session: req.params.session
    });

    if (!noticesClassroom) {
      throw new BadRequestError("[Notices] Institute not found")
    }

    noticesClassroom.classrooms.push(classroom.id);

    await noticesClassroom.save();
*/
    return res.status(201).send(classroom);
  }
);

export { router as createClassroomRouter };
