import parseArgumentsExer from "./utils/parseArgumentsExer";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (target: number, days: number[]): Result => {
  const periodLength = days.length;
  const trainingDays = days.filter((day) => day > 0).length;
  const average = days.reduce((a, b) => a + b, 0) / periodLength;
  let rating = 1;
  let ratingDescription = "poor";

  if (average >= target) {
    rating = 3;
    ratingDescription = "good";
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = "not too bad";
  }

  return {
    periodLength,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

if (require.main === module) {
  try {
    const { target, days } = parseArgumentsExer(process.argv);
    console.log(calculateExercises(target, days));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
