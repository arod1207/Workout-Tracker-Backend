import express from "express";
import {
  createWorkout,
  deleteSingleWorkout,
  getAllWorkouts,
  getSingleWorkout,
  updateWorkout,
} from "../controllers/workoutController.js";
import { Workout } from "../models/workoutModel.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

// Require auth for all workout routes
router.use(requireAuth);

//GET ALL WORKOUTS
router.get("/", getAllWorkouts);

//GET A SINGLE WORKOUT
router.get("/:id", getSingleWorkout);

//Create a workout
router.post("/", createWorkout);

//Delete a workout
router.delete("/:id", deleteSingleWorkout);

//Update a workout
router.patch("/:id", updateWorkout);

export { router as WorkoutRoutes };
