import { useState, useEffect } from "react";
import type { DiaryEntry, MessageType } from "./types";
import { getAllDiaries } from "./diaryService";
import Form from "./components/Form";
import List from "./components/List";
import Message from "./components/Message";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [message, setMessage] = useState<MessageType>({
    success: false,
    text: "",
  });

  useEffect(() => {
    getAllDiaries().then((data) => setDiaries(data));
  }, []);

  return (
    <>
      <h1>Flight Diary</h1>
      {message.text ? <Message {...message} /> : null}
      <Form setDiaries={setDiaries} diaries={diaries} setMessage={setMessage} />
      <List diaries={diaries} />
    </>
  );
}

export default App;
