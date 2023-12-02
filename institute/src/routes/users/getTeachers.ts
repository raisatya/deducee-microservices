import express, { Request, Response } from "express";

import { Teacher } from "../../models/users/Teacher";

const router = express.Router();

router.get(
  "/api/institute/:instituteId/teachers",
  async (req: Request, res: Response) => {
    const teachers = await Teacher.find({ instituteId: req.params.instituteId });

    return res.status(200).send(teachers);
  }
);

export { router as readTeachersRouter };
