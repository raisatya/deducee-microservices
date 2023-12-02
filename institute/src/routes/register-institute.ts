import express, { Request, Response } from "express";
import { BadRequestError, validateRequest } from "@srdeducee/commonlib";
import { body } from "express-validator";

import { Institute } from "../models/Institute";
//import { NoticesClassroomList } from "../models/notices/NoticesClassroomList";

const router = express.Router();

router.post(
  "/api/institute/registerInstitute",
  [
    body("instituteName")
      .not()
      .isEmpty()
      .withMessage("Institute Name must not be empty"),
    body("instituteId")
      .not()
      .isEmpty()
      .withMessage("Institute ID must not be empty"),
    body("currentSession")
      .not()
      .isEmpty()
      .withMessage("Institute ID must not be empty"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { instituteName, instituteId, currentSession, sessions, classrooms } = req.body;

    const existingInstitute = await Institute.findOne({ instituteId });

    if (existingInstitute) {
      throw new BadRequestError("[Institute] Institute already registered");
    }

    const instituteDetails = {
      instituteId,
      instituteName,
      currentSession,
      sessions,
      classrooms
    };

    const institute = Institute.build(instituteDetails);

    await institute.save();
/*
    const noticesInstitute = NoticesClassroomList.build({
      instituteId,
      session: currentSession,
      classrooms
    })

    await noticesInstitute.save();
*/    
    return res.status(201).send(institute);
  }
);

export { router as registerInstituteRouter };
