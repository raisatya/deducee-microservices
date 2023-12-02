import express, { Request, Response } from "express";
import { BadRequestError } from "@srdeducee/commonlib";

import { Classroom } from "../models/Classroom";
//import { Institute } from "../../models/institute/Institute";
//import { NoticesClassroomList } from "../../models/notices/NoticesClassroomList";

const router = express.Router();

router.get(
  "/api/classroom/:instituteId/:session/:classroomId/disable",
  async (req: Request, res: Response) => {
    const existingClassroomDoc = await Classroom.findOne({
      _id: req.params.classroomId,
      instituteId: req.params.instituteId,
      session: req.params.session,
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

    let NumberOfClassrooms = existingInstituteDoc.classrooms.length;

    if (NumberOfClassrooms !== 0) {
      for (let i = 0; i < NumberOfClassrooms; i++) {
        if (existingInstituteDoc.classrooms[i] == req.params.classroomId) {
          existingInstituteDoc.classrooms.splice(i, 1);
          break;
        }
      }
    }

    await existingInstituteDoc.save();

    const existingNoticesClassroomDoc = await NoticesClassroomList.findOne({
      instituteId: req.params.instituteId,
      session: req.params.session,
    });

    if (!existingNoticesClassroomDoc) {
      throw new BadRequestError("[Notices] Classroom not found");
    }

    let NumberOfNoticesClassrooms =
      existingNoticesClassroomDoc.classrooms.length;

    if (NumberOfNoticesClassrooms !== 0) {
      for (let i = 0; i < NumberOfNoticesClassrooms; i++) {
        if (
          existingNoticesClassroomDoc.classrooms[i] == req.params.classroomId
        ) {
          existingNoticesClassroomDoc.classrooms.splice(i, 1);
          break;
        }
      }
    }

    await existingNoticesClassroomDoc.save();
*/
    existingClassroomDoc.disabled = true;

    await existingClassroomDoc.save();

    return res.status(201).send(existingClassroomDoc);
  }
);

export { router as disableClassroomRouter };
