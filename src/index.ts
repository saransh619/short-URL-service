import express from "express";
import { connectToMongoDB } from "./database/connect";
import urlRoutes from "./routes/url.route";

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("Mongodb connected"))
  .catch((err) => {
    console.log("Error connecting to MongoDB", err.message);
  });

app.use(express.json());
app.use("/url", urlRoutes);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
