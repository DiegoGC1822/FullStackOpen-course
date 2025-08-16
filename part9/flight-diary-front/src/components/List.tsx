import type { DiaryEntry } from "../types";

const List = ({ diaries }: { diaries: DiaryEntry[] }) => {
  return (
    <div>
      <h2>Diary Entries</h2>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <p>
            <strong>Date:</strong> {diary.date} <br />
            <strong>Weather:</strong> {diary.weather} <br />
            <strong>Visibility:</strong> {diary.visibility} <br />
            <strong>Comment:</strong> {diary.comment}
          </p>
        </div>
      ))}
    </div>
  );
};

export default List;
