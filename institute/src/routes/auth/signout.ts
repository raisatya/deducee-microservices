import express, { Request, Response } from "express";

const router = express.Router();

router.post("/api/institute/users/signout", (req: Request, res: Response) => {
  req.session = null;
  return res.send({});
});

export { router as signoutRouter };
