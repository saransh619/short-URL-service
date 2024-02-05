import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { restrictToLoggedinUserOnly, checkAuth } from "./middlewares/auth";
import { connectToMongoDB } from "./database/connect";
import URL from "./models/url";
import User from "./models/user"

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}

import urlRoute from "./routes/url";
import staticRoute from "./routes/staticRouter";
import userRoute from "./routes/user";

const app = express();
const PORT = 8000;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("Mongodb connected"))
  .catch((err) => {
    console.log("Error connecting to MongoDB", err.message);
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("src/views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (entry) {
    res.redirect(entry.redirectURL);
  } else {
    res.status(404).send("URL not found");
  }
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
