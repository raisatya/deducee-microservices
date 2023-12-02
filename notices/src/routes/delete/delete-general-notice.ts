import express, { Request, Response } from "express";

import { GeneralNotices } from "../../models/GeneralNotices";

const router = express.Router();

router.delete(
  "/api/notices/generalnotice/:id/delete",
  async (req: Request, res: Response) => {
    await GeneralNotices.deleteOne({ _id: req.params.id  });

    return res.status(201).send("Deleted successfully");
  }
);

export { router as deleteGeneralNoticeRouter };
