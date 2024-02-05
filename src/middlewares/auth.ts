import { Request, Response, NextFunction } from "express";
import { getUser } from "../service/auth";
import User from "../models/user";

// Extend the Request interface with the user property
declare module "express-serve-static-core" {
    interface Request {
        user?: User;
    }
}

export async function restrictToLoggedinUserOnly(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const userUid = req.cookies?.uid;

    if (!userUid) return res.redirect("/login");

    const user = getUser(userUid);

    if (!user) return res.redirect("/login");

    req.user = user as User;
    next();
}

export async function checkAuth(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const userUid = req.cookies?.uid;

    const user = getUser(userUid);

    req.user = user as User;
    next();
}
