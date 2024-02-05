import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import User from "../models/user";
import { setUser } from "../service/auth";

 async function handleUserSignup(req: Request, res: Response): Promise<void> {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  res.redirect("/");
}

 async function handleUserLogin(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user) {
    res.render("login", {
      error: "Invalid Username or Password",
    });
    return;
  }

  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId);
  res.redirect("/");
}

export { handleUserSignup, handleUserLogin };