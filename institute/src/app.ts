import express, { Request, Response } from "express";
import { json } from "body-parser";
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from "@srdeducee/commonlib";
import 'express-async-errors';

//Institute Service Routers
import { currentUserRouter } from "./routes/auth/current-user";
import { registerInstituteRouter } from "./routes/register-institute";
import { registerAdminRouter } from "./routes/users/register-admin";
import { registerTeacherRouter } from "./routes/users/register-teacher";
import { registerStudentRouter } from "./routes/users/register-student";
import { signinAdminRouter } from "./routes/auth/signin-admin";
import { signinTeacherRouter } from "./routes/auth/signin-teacher";
import { signinStudentRouter } from "./routes/auth/signin-student";
import { signoutRouter } from "./routes/auth/signout";
import { readAdminsRouter } from "./routes/users/getAdmins";
import { readTeachersRouter } from "./routes/users/getTeachers";
import { updateInstituteSessionRouter } from "./routes/update-institute-session";
import { updateAdminRouter } from "./routes/users/update/update-admin";
import { updateTeacherRouter } from "./routes/users/update/update-teacher";
import { updateStudentRouter } from "./routes/users/update/update-student";

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false, //This line needs to be changed in prod
  })
);

//Institute -Register
app.use(registerInstituteRouter); //Passed
app.use(registerAdminRouter); //Passed
app.use(registerTeacherRouter); //Passed
app.use(registerStudentRouter); //Passed

//Institute -Update
app.use(updateInstituteSessionRouter);
app.use(updateAdminRouter); //Passed
app.use(updateTeacherRouter); //Passed
app.use(updateStudentRouter); //Passed
//app.use(promoteStudentRouter);

//Institute -Auth
app.use(signinAdminRouter); //Passed
app.use(signinTeacherRouter); //Passed
app.use(signinStudentRouter); //Passed
app.use(signoutRouter); //Passed
app.use(currentUserRouter); //Passed

//Institute -Get
app.use(readAdminsRouter); //Passed
app.use(readTeachersRouter); //Passed

//Institute

app.all('*', async (_req: Request, _res: Response) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };