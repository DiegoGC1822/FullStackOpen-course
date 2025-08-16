interface ArgumentsExer {
  target: number;
  days: number[];
}

const parseArgumentsExer = (args: string[]): ArgumentsExer => {
  if (args.length < 4) {
    throw new Error("Please provide at least two arguments.");
  }

  const numbers: number[] = [];

  for (let i = 2; i < args.length; i++) {
    const num = Number(args[i]);

    if (isNaN(num)) {
      throw new Error("Please provide only valid numbers.");
    }

    if (i > 2) numbers.push(num);
  }

  return {
    target: Number(args[2]),
    days: numbers,
  };
};

export default parseArgumentsExer;
