import mongoose, { Document, Schema } from "mongoose";

interface URL {
  shortId: string;
  redirectURL: string;
  visitHistory: { timestamp: number }[];
  createdBy: mongoose.Types.ObjectId;
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
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const URLModel = mongoose.model<Document & URL>("URL", urlSchema);

export default URLModel;
