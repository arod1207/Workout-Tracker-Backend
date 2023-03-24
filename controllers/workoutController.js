import { Workout } from "../models/workoutModel.js";
import mongoose from "mongoose";

//get all workouts
export const getAllWorkouts = async (req, res) => {
  const user_id = req.user._id;
  try {
    const response = await Workout.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get a single workout
export const getSingleWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such workout found!" });
    }

    const response = await Workout.findById(id);

    if (!response) {
      return res.status(404).json({ error: "No such workout found!" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//create a new workout
export const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (!load) {
    emptyFields.push("weight");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields.", emptyFields });
  }
  // Add workout to db
  try {
    const user_id = req.user._id;
    const workout = await Workout.create({
      title,
      reps,
      load,
      user_id,
    });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a workout
export const deleteSingleWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Workout not found!" });
    }

    const response = await Workout.findByIdAndDelete(id);

    if (!response) {
      return res.status(400).json({ error: "Workout not found!" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//update a workout
export const updateWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Workout not found!" });
    }

    const response = await Workout.findByIdAndUpdate(id, {
      ...req.body,
    });

    if (!response) {
      res.status(400).json({ error: "Workout not found!" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
