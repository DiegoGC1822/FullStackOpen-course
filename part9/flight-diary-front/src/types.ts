export type Weather = "sunny" | "rainy" | "cloudy" | "stormy" | "windy";

export type Visibility = "great" | "good" | "ok" | "poor";

export type DiaryEntry = {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
};

export type NewDiaryEntry = Omit<DiaryEntry, "id">;

export type FormProps = {
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  diaries: DiaryEntry[];
  setMessage: React.Dispatch<React.SetStateAction<MessageType>>;
};

export type MessageType = {
  success: boolean;
  text: string;
};
