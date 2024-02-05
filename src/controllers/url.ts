import { Request, Response } from "express";
import shortid from "shortid";
import URLModel from "../models/url";

export async function handleGenerateNewShortURL(req: Request, res: Response): Promise<void> {
  const body = req.body;
  if (!body.url) {
    res.status(400).json({ error: "url is required" });
    return;
  }

  const createdBy = req.user?._id; // Check if req.user is defined
  const shortID = shortid();
  await URLModel.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy,
  });

  res.json({ id: shortID });
}

export async function handleRedirectURL(req: Request, res: Response): Promise<void> {
  const shortId = req.params.shortId;
  const entry = await URLModel.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry?.redirectURL || "/");
}

export async function handleGetAnalytics(req: Request, res: Response): Promise<void> {
  const shortId = req.params.shortId;
  const result = await URLModel.findOne({ shortId });
  res.json({
    totalClicks: result?.visitHistory.length || 0,
    analytics: result?.visitHistory || [],
  });
}