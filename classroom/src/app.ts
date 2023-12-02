import express, { Request, Response } from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from "@srdeducee/commonlib";
import "express-async-errors";

//Classroom
import { createClassroomRouter } from "./routes/create/create-classroom";
import { readClassroomRouter } from "./routes/read/read-classroom";
import { readAllClassroomsRouter } from "./routes/read/read-classrooms";
import { createAttendanceRouter } from "./routes/attendance/create-attendance";
import { createExamDataRouter } from "./routes/examination/create-examination-data";
import { createExamStatsRouter } from "./routes/examination/create-examination-stats";
import { readAttendanceRouter } from "./routes/attendance/read-attendance";
import { readAllExamDataRouter } from "./routes/examination/read-all-examination-data";
import { readOneExamDataRouter } from "./routes/examination/read-one-examination-data";
import { readOneExamStatsRouter } from "./routes/examination/read-one-examination-stats";
import { readAllExamStatsRouter } from "./routes/examination/read-all-examination-stats";
import { createSubjectRouter } from "./routes/subjects/create-subject";
import { disableClassroomRouter } from "./routes/disable-classroom";
import { enableClassroomRouter } from "./routes/enable-classroom";
//import { promoteStudentRouter } from "./routes/institute/users/update/promote-student";
import { updateSubjectRouter } from "./routes/subjects/update-subject";
import { deleteSubjectRouter } from "./routes/subjects/delete-subject";
import { readAllStudentsExamStatsRouter } from "./routes/examination/read-all-students-examination-stats";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false, //This line needs to be changed in prod
  })
);

//app.use(promoteStudentRouter);

//Classroom
app.use(createClassroomRouter); //Passed
app.use(createSubjectRouter); //Passed
app.use(updateSubjectRouter); //Passed
app.use(deleteSubjectRouter); //Passed
app.use(readClassroomRouter); //Passed
app.use(readAllClassroomsRouter); //Passed
app.use(createAttendanceRouter); //Passed
app.use(readAttendanceRouter); //Passed
app.use(createExamDataRouter); //Passed
app.use(readAllExamDataRouter); //Passed
app.use(readOneExamDataRouter); //Passed
app.use(createExamStatsRouter); //Passed
app.use(readOneExamStatsRouter); //Passed
app.use(readAllExamStatsRouter); //Passed
app.use(readAllStudentsExamStatsRouter); //Passed

app.use(disableClassroomRouter); //Passed
app.use(enableClassroomRouter); //Passed
//Institute

app.all("*", async (_req: Request, _res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
