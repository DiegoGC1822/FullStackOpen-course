import { CoursePart } from "../types";
import "../style.css";

const Part = ({ part }: { part: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(`Unhandled case: ${JSON.stringify(value)}`);
  };

  switch (part.kind) {
    case "basic":
      return (
        <div className="part">
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <i>{part.description ? part.description : ""}</i>
        </div>
      );
    case "group":
      return (
        <div className="part">
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>project exercises: {part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div className="part">
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <i>{part.description ? part.description : ""}</i>
          <p>submit to: {part.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div className="part">
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <i>{part.description ? part.description : ""}</i>
          <p>requirements: {part.requirements.join(", ")}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
