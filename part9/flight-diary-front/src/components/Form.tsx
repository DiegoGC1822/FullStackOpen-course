import React, { useState } from "react";
import type { Weather, Visibility, FormProps } from "../types";
import { createDiary } from "../diaryService";
import axios from "axios";

const Form = ({ setDiaries, diaries, setMessage }: FormProps) => {
  const [newDate, setNewDate] = useState("");
  const [newWeather, setNewWeather] = useState<Weather | "">("");
  const [newVisibility, setNewVisibility] = useState<Visibility | "">("");
  const [newComment, setNewComment] = useState("");

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (newWeather === "" || newVisibility === "") {
      alert("Please fill at least date, weather and visibility fields");
      return;
    }
    const diaryObject = {
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment,
    };
    createDiary(diaryObject)
      .then((returnedDiary) => {
        setDiaries(diaries.concat(returnedDiary));
        setMessage({ success: true, text: `Diary added successfully!` });
        setTimeout(() => setMessage({ success: false, text: "" }), 5000);
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError(error)) console.log(error.response?.data);

        const msg = axios.isAxiosError(error)
          ? `${error.response?.data ?? error.message}`
          : "An unexpected error occurred.";

        setMessage({ success: false, text: msg });
        setTimeout(() => setMessage({ success: false, text: "" }), 5000);
      });

    setNewDate("");
    setNewWeather("");
    setNewVisibility("");
    setNewComment("");
  };

  return (
    <form>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
      </div>
      <div>
        <div>
          <label style={{ marginRight: "10px" }}>Weather: </label>
          sunny{" "}
          <input
            type="radio"
            name="weather"
            checked={newWeather === "sunny"}
            onChange={() => setNewWeather("sunny")}
          />
          rainy{" "}
          <input
            type="radio"
            name="weather"
            checked={newWeather === "rainy"}
            onChange={() => setNewWeather("rainy")}
          />
          cloudy{" "}
          <input
            type="radio"
            name="weather"
            checked={newWeather === "cloudy"}
            onChange={() => setNewWeather("cloudy")}
          />
          stormy{" "}
          <input
            type="radio"
            name="weather"
            checked={newWeather === "stormy"}
            onChange={() => setNewWeather("stormy")}
          />
          windy{" "}
          <input
            type="radio"
            name="weather"
            checked={newWeather === "windy"}
            onChange={() => setNewWeather("windy")}
          />
        </div>
      </div>
      <div>
        <label style={{ marginRight: "10px" }}>Visibility: </label>
        great{" "}
        <input
          type="radio"
          name="visibility"
          checked={newVisibility === "great"}
          onChange={() => setNewVisibility("great")}
        />
        good{" "}
        <input
          type="radio"
          name="visibility"
          checked={newVisibility === "good"}
          onChange={() => setNewVisibility("good")}
        />
        ok{" "}
        <input
          type="radio"
          name="visibility"
          checked={newVisibility === "ok"}
          onChange={() => setNewVisibility("ok")}
        />
        poor{" "}
        <input
          type="radio"
          name="visibility"
          checked={newVisibility === "poor"}
          onChange={() => setNewVisibility("poor")}
        />
      </div>
      <div>
        <label>Comment:</label>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
      </div>
      <button type="submit" onClick={diaryCreation}>
        Add Diary Entry
      </button>
    </form>
  );
};

export default Form;
