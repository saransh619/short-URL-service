import mongoose, { Document, Schema } from "mongoose";

interface URL {
  shortId: string;
  redirectURL: string;
  visitHistory: { timestamp: number }[];
}

const urlSchema = new Schema<URL>(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
  },
  { timestamps: true }
);

const URLModel = mongoose.model<Document & URL>("URL", urlSchema);

export default URLModel;
