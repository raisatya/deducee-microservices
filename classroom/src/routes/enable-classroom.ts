import express, { Request, Response } from "express";
import { BadRequestError } from "@srdeducee/commonlib";

import { Classroom } from "../models/Classroom";
//import { Institute } from "../../models/institute/Institute";
//import { NoticesClassroomList } from "../../models/notices/NoticesClassroomList";

const router = express.Router();

router.get(
  "/api/classroom/:instituteId/:session/:classroomId/enable",
  async (req: Request, res: Response) => {
    const existingClassroomDoc = await Classroom.findOne({
      _id: req.params.classroomId,
      instituteId: req.params.instituteId,
      session: req.params.session
    });

    if (!existingClassroomDoc) {
      throw new BadRequestError("[Classroom] Classroom not found");
    }
/*
    const existingInstituteDoc = await Institute.findOne({
      instituteId: req.params.instituteId,
    });

    if (!existingInstituteDoc) {
      throw new BadRequestError("[Institute] Institute not found");
    }

    existingInstituteDoc.classrooms.push(req.params.classroomId);

    const existingNoticesClassroomDoc = await NoticesClassroomList.findOne({
      instituteId: req.params.instituteId,
      session: req.params.session,
    });

    if (!existingNoticesClassroomDoc) {
      throw new BadRequestError("[Notices] Classroom not found");
    }

    existingNoticesClassroomDoc.classrooms.push(req.params.classroomId);
*/
    existingClassroomDoc.disabled = false;

    await existingClassroomDoc.save();

    return res.status(201).send(existingClassroomDoc);
  }
);

export { router as enableClassroomRouter };
