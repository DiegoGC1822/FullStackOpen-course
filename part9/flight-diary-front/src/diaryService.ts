import axios from "axios";

import type { DiaryEntry, NewDiaryEntry } from "./types";

const baseUrl = "http://localhost:3001/api/diaries";

export const getAllDiaries = () => {
  return axios.get<DiaryEntry[]>(baseUrl).then((response) => response.data);
};

export const createDiary = (newDiaryEntry: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl, newDiaryEntry)
    .then((response) => response.data);
};
