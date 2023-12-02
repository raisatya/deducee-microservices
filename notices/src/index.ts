import { app } from "./app";
import mongoose from "mongoose";

const CONNECTION_URL =
  "mongodb+srv://raisatya23:atleast10charswith%2A%40SYMBOLS%2DdeduceeCluster0@deduceecluster0.zedj4h4.mongodb.net/?retryWrites=true&w=majority";

const start = async () => {
  /*
      if (!process.env.JWT_KEY) {
        throw new Error('[Auth] JWT_KEY must be defined');
      }
      
      if (!process.env.MONGO_URI) {
        throw new Error('[Auth] MONGO_URI must be defined');
      }
    */
  try {
    await mongoose.connect(CONNECTION_URL);
    console.log("[Auth] Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
  app.listen(5000, () => {
    console.log("[Auth] Listening on port 5000");
  });
};

start();
