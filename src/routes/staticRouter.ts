import express, { Request, Response } from "express";
import URL from "../models/url";
import User from "../models/user";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  if (!req.user) return res.redirect("/login");
  const allurls = await URL.find({ createdBy: (req.user as unknown as User)._id });
  return res.render("home", {
    urls: allurls,
  });
});

router.get("/signup", (req: Request, res: Response) => {
  return res.render("signup");
});

router.get("/login", (req: Request, res: Response) => {
  return res.render("login");
});

export default router;
