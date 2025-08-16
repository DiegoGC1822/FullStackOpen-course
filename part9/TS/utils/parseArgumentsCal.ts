interface ArgumentsCal {
  height: number;
  weight: number;
}

const parseArgumentsCal = (args: string[]): ArgumentsCal => {
  if (args.length < 4) {
    throw new Error("Not enough arguments.");
  }

  if (args.length > 4) {
    throw new Error("Too many arguments.");
  }

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error("Please provide only valid numbers.");
  }

  return {
    height,
    weight,
  };
};

export default parseArgumentsCal;
