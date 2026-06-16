import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  await mongoose.connect(process.env.MONGO_URI! as string);

  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
  });

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
  });
};
