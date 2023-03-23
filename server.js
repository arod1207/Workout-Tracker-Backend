import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import { WorkoutRoutes } from "./routes/workouts.js";
import { userRouter } from "./routes/user.js";

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());

//DB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(
        `Connected to db and connected to server running on port ${PORT}`
      )
    );
  })
  .catch((err) => {
    console.log(err);
  });

//Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Workout Route
app.use("/api/workouts", WorkoutRoutes);

//User Route
app.use("/api/user", userRouter);
