import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.SECRET_KEY as Secret | undefined;

function setUser(user: any) {
  if (!secretKey) {
    throw new Error("Secret key is not defined");
  }
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    },
    secretKey
  );
}

function getUser(token: string) {
  try {
    // console.log("Received token:", token);

    if (!token) {
      throw new Error("Token is not provided");
    }

    if (!secretKey) {
      throw new Error("Secret key is not defined");
    }

    return jwt.verify(token, secretKey as any);
  } catch (error: any) {
    // console.error("JWT verification error:", error.message);
    return null;
  }
}

export { setUser, getUser };