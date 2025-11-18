import mongoose from "mongoose";
import dotenv from "dotenv";
import { seedDoctors } from "../utils/seedDoctors";

dotenv.config();

const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!mongoUri) {
  console.error("Mongo URI missing. Set MONGO_URI or MONGODB_URI in .env");
  process.exit(1);
}

const run = async () => {
  try {
    await mongoose.connect(mongoUri);
    await seedDoctors();
    console.log("Doctor seeding completed.");
  } catch (err) {
    console.error("Doctor seeding failed:", err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

run();

