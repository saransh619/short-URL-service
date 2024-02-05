import express from "express";
import {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleRedirectURL,
} from "../controllers/url";

const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get("/:shortId", handleRedirectURL);
router.get("/analytics/:shortId", handleGetAnalytics);

export default router;
