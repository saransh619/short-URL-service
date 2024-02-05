import express, { Request, Response } from "express";
import URL from "../models/url";
import User from "../models/user";
import { restrictTo } from "../middlewares/auth";

const router = express.Router();

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req: Request, res: Response) => {
  const allurls = await URL.find({});
  return res.render("home", {
      urls: allurls,
      user: req.user,
  });
});

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req: Request, res: Response) => {
  const allurls = await URL.find({ createdBy: (req.user as unknown as User)._id });
  return res.render("home", {
      urls: allurls,
      user: req.user // Pass the user to the view for rendering
  });
});


router.get("/signup", (req: Request, res: Response) => {
  return res.render("signup");
});

router.get("/login", (req: Request, res: Response) => {
  return res.render("login");
});

router.get("/logout", (req: Request, res: Response) => {
  // Clear the token cookie and redirect to the login page
  res.clearCookie("token");
  res.redirect("/login");
});

export default router;
