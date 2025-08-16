import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;

  if (
    isNaN(Number(height)) ||
    isNaN(Number(weight)) ||
    height === "" ||
    weight === ""
  ) {
    res.send({
      error: "malformatted parameters",
    });
  }

  res.send({
    weight: weight,
    height: height,
    bmi: calculateBmi(Number(height), Number(weight)),
  });
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;

  if (daily_exercises === undefined || target === undefined) {
    res.send({
      error: "parameters missing",
    });
  }

  console.log(daily_exercises, target);
  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((d) => typeof d !== "number" || d < 0 || isNaN(d)) ||
    typeof target !== "number" ||
    isNaN(target) ||
    target < 0
  ) {
    res.send({
      error: "malformatted parameters",
    });
  }

  res.send(calculateExercises(target, daily_exercises));
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
