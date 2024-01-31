import mongoose from "mongoose";

mongoose.set("strictQuery", true);

export async function connectToMongoDB(url: string): Promise<void> {
  await mongoose.connect(url);
}
