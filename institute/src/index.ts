import { app } from './app';
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();


const start = async () => {
  try {

    if (!process.env.CONNECTION_URL) {
      throw new Error("[Institute] MONGO_URI must be defined");
    }

    await mongoose.connect(process.env.CONNECTION_URL);
    console.log('[Institute] Connected to MongoDB');
  } catch (err) {
    console.log(err);
  }
  app.listen(5000, () => {
    console.log('[Institute] Listening on port 5000');
  });
};

start();