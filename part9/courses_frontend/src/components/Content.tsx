import { CoursePart } from "../types";
import { ContentProps } from "../types";
import Part from "./Part";

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((part: CoursePart) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};

export default Content;
