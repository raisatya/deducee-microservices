import express, { Request, Response } from "express";

import { ClassroomNotices } from "../../models/ClassroomNotices";

const router = express.Router();

router.delete(
  "/api/notices/classroomnotice/:id/delete",
  async (req: Request, res: Response) => {
    await ClassroomNotices.deleteOne({ _id: req.params.id  });

    return res.status(201).send("Deleted successfully");
  }
);

export { router as deleteClassroomNoticeRouter };
