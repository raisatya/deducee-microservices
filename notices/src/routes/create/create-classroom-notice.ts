import express, { Request, Response } from "express";
import { BadRequestError, NotFoundError, validateRequest } from "@srdeducee/commonlib";
import { body } from "express-validator";

import { ClassroomNotices } from "../../models/ClassroomNotices";
import { NoticesClassroomList } from "../../models/NoticesClassroomList";

const router = express.Router();

router.post(
  "/api/notices/classroomnotice/:instituteId/:classroomId/:session/create",
  [
    body("noticeTitle")
      .not()
      .isEmpty()
      .withMessage("Notice title must not be empty"),
    body("noticeBody")
      .not()
      .isEmpty()
      .withMessage("Notice body must not be empty"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { noticeTitle, noticeBody, publishedBy, publisherId, role } = req.body;
    
    const sessionClassrooms = await NoticesClassroomList.findOne({
      instituteId: req.params.instituteId,
      session: req.params.session
    });

    if (!sessionClassrooms) {
      throw new BadRequestError("[Notices] Institute Not Found");
    }

    const classroomId = req.params.classroomId;

    if (!sessionClassrooms.classrooms.includes(classroomId)) {
      throw new BadRequestError("[Notices] Classroom Not Found");
    }

    const classroomNotice = ClassroomNotices.build({
      noticeTitle,
      noticeBody,
      instituteId: req.params.instituteId,
      session: req.params.session,
      publishedBy,
      publisherId,
      role,
      designatedClassroom: req.params.classroomId,
    });
    await classroomNotice.save();

    return res.status(201).send(classroomNotice);
  }
);

export { router as createClassroomNoticeRouter };
