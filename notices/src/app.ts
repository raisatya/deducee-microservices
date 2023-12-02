import express, { Request, Response } from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from "@srdeducee/commonlib";
import "express-async-errors";

//Notices
import { createGeneralNoticeRouter } from "./routes/create/create-general-notice";
import { createClassroomNoticeRouter } from "./routes/create/create-classroom-notice";
import { readGeneralNoticesRouter } from "./routes/read/read-general-notices";
import { readClassroomNoticesRouter } from "./routes/read/read-classroom-notices";
import { deleteGeneralNoticeRouter } from "./routes/delete/delete-general-notice";
import { deleteClassroomNoticeRouter } from "./routes/delete/delete-classroom-notice";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false, //This line needs to be changed in prod
  })
);

//Notices
app.use(createGeneralNoticeRouter); //Passed
app.use(createClassroomNoticeRouter); //Passed
app.use(readGeneralNoticesRouter); //Passed
app.use(readClassroomNoticesRouter); //Passed
app.use(deleteGeneralNoticeRouter); //Passed
app.use(deleteClassroomNoticeRouter); //Passed

app.all("*", async (_req: Request, _res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
