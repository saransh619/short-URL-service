import { Request, Response, NextFunction } from "express";
import { getUser } from "../service/auth";
import User from "../models/user";

// Extend the Request interface with the user property
declare module "express-serve-static-core" {
    interface Request {
        user?: User;
    }
}

function checkForAuthentication( req: Request,
    res: Response,
    next: NextFunction){
    const tokenCookie = req.cookies?.token;
    req.user = null as any;

    if(!tokenCookie) return next();

    const token = tokenCookie;
    const user = getUser(token);

    if (user !== null) {
        req.user = user as User;
    }
    return next();
}


function restrictTo(roles: string[] = []) {
    return function (req: Request, res: Response, next: NextFunction) {
        // Check if req.user is defined and not null
        if (req.user && req.user.role) {
            const userRole = req.user.role;

            if (!roles.includes(userRole)) {
                return res.end("Unauthorized");
            }
        } else {
            return res.end("Unauthorized");
        }

        return next();
    };
}

export { checkForAuthentication, restrictTo};