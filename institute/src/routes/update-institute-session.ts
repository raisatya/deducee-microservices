import express, { Request, Response } from "express";
import { BadRequestError, validateRequest } from "@srdeducee/commonlib";
import { body } from "express-validator";

import { Institute } from "../models/Institute";
//import { Classroom } from "../models/classroom/Classroom";
//import { NoticesClassroomList } from "../models/notices/NoticesClassroomList";

const router = express.Router();

router.post(
  "/api/classroom/:instituteId/:session/update",
  [
    body("newSession")
      .not()
      .isEmpty()
      .withMessage("New session name must not be empty")
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { newSession, students, subjects } = req.body;

    let classroomArray: string[] = [];

    const existingInstituteDoc = await Institute.findOne({
      instituteId: req.params.instituteId,
      session: req.params.session
    });

    if (!existingInstituteDoc) {
      throw new BadRequestError("[Institute] Institute not found");
    }

    existingInstituteDoc.currentSession = newSession;
    existingInstituteDoc.sessions.push(newSession);

    await existingInstituteDoc.save();
/*
    const existingClassroomDoc = await Classroom.find({
      instituteId: req.params.instituteId,
      session: req.params.session
    });

    if(existingClassroomDoc) {
      existingClassroomDoc.map(async (item) => {
        const newClassroomDoc = Classroom.build({
          instituteId: req.params.instituteId,
          session: newSession,
          classroomName: item.classroomName,
          students,
          subjects,
        });

        await newClassroomDoc.save();

        classroomArray.push(newClassroomDoc.id);
      })

      if(classroomArray.length > 0) {
        classroomArray.map((item) => {
          existingInstituteDoc.classrooms.push(item);
        })
      }

      await existingInstituteDoc.save();

      const noticesclassroomlistDoc = NoticesClassroomList.build({
        instituteId: req.params.instituteId,
        session: newSession,
        classrooms: existingInstituteDoc.classrooms
      });

      await noticesclassroomlistDoc.save();
    }

    //Find all the classrooms with the previous session.- Done
    //Create new documents of all the previous session's classrooms. - Done
    //Make an api to promote students individually to another class.
    //Select garda chai class class bata promote garney banawnu pryo frontend ma
    //Notices - Pop disabled classrooms from noticesclassroomlist
    //Notices - Push enabled classrooms into noticesclassroomlist
*/
    return res.status(201).send(existingInstituteDoc);
  }
);

export { router as updateInstituteSessionRouter };
