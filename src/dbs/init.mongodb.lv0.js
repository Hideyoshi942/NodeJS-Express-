"use strict";

import mongoose from "mongoose";

const connectString = "mongodb://localhost:27017/shopDEV";

const connectDB = async () => {
  try {
    await mongoose.connect(connectString);
    console.log("Connected MongoDB Success");
  } catch (err) {
    console.log("Error Connect!", err);
    process.exit(1);
  }
};
// dev
if (1 === 0) {
  // mongoose.set('debug', true)
  mongoose.set("debug", { color: true });
}

export default connectDB;
