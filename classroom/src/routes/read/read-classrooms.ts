import express, { Request, Response } from "express";

import { Classroom } from "../../models/Classroom";

const router = express.Router();

router.get(
  "/api/classroom/:instituteId/:session",
  async (req: Request, res: Response) => {
    const classrooms = await Classroom.find({
      instituteId: req.params.instituteId,
      session: req.params.session,
      disabled: false
    });

    return res.status(200).send(classrooms);
  }
);

export { router as readAllClassroomsRouter };
