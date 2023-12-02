import express, { Request, Response } from "express";

import { Attendance } from "../../models/Attendance";

const router = express.Router();

router.get(
  "/api/classroom/:instituteId/:session/:classroomId/:studentId/attendance",
  async (req: Request, res: Response) => {
    const attendanceDoc = await Attendance.findOne({
      instituteId: req.params.instituteId,
      session: req.params.session,
      classroomId: req.params.classroomId,
      studentId: req.params.studentId,
    });

    return res.status(200).send(attendanceDoc);
  }
);

export { router as readAttendanceRouter };
