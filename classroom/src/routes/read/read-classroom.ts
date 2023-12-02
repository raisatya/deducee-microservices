import express, { Request, Response } from "express";

import { Classroom } from "../../models/Classroom";
import { BadRequestError } from "@srdeducee/commonlib";

const router = express.Router();

router.get(
  "/api/classroom/:instituteId/:session/:classroomId",
  async (req: Request, res: Response) => {
    const classroom = await Classroom.findOne({
      _id: req.params.classroomId,
      instituteId: req.params.instituteId,
      session: req.params.session,
    });

    if(!classroom) {
      throw new BadRequestError("[Classroom] Classroom not found");
    }

    return res.status(200).send(classroom);
  }
);

export { router as readClassroomRouter };
