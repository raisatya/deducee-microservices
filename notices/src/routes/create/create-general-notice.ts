import express, { Request, Response } from "express";
import { BadRequestError, validateRequest } from "@srdeducee/commonlib";
import { body } from "express-validator";

import { GeneralNotices } from "../../models/GeneralNotices";
import { NoticesClassroomList } from "../../models/NoticesClassroomList";

const router = express.Router();

router.post(
  "/api/notices/generalnotice/:instituteId/:session/create",
  [
    body("noticeTitle").not().isEmpty().withMessage("Notice title must not be empty"),
    body("noticeBody").not().isEmpty().withMessage("Notice body must not be empty"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { noticeTitle, noticeBody, publishedBy, publisherId, role } = req.body;

    const sessionClassrooms = await NoticesClassroomList.findOne({
      instituteId: req.params.instituteId,
      session: req.params.session,
    });

    if (!sessionClassrooms) {
      throw new BadRequestError("[Notices] Institute Not Found");
    }

    const generalNotice = GeneralNotices.build({
      noticeTitle,
      noticeBody,
      instituteId: req.params.instituteId,
      session: req.params.session,
      publishedBy,
      publisherId,
      role,
    });
    await generalNotice.save();

    return res.status(201).send(generalNotice);
  }
);

export { router as createGeneralNoticeRouter };
