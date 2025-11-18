import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import authRoutes from "./routes/auth";
import wellnessRoutes from "./routes/wellness";
import bookingRoutes from "./routes/bookings";
import userRoutes from "./routes/users";
import doctorRoutes from "./routes/doctor";
import { seedDoctors } from "./utils/seedDoctors";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!mongoUri) {
  console.error(
    "MongoDB URI is not defined. Please set MONGO_URI or MONGODB_URI in your .env file."
  );
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(async () => {
    console.log("MongoDB connected");
    await seedDoctors();
  })
  .catch((err: any) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/wellness", wellnessRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/doctor", doctorRoutes);

app.get("/", (req: express.Request, res: express.Response) =>
  res.send("Backend Running")
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
