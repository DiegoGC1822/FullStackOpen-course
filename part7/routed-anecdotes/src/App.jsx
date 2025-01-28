import { useState, useEffect } from "react";

import AnecdoteList from "./pages/AnecdoteList";
import CreateNew from "./pages/CreateNew";
import About from "./pages/About";
import Anecdote from "./pages/Anecdote";

import Footer from "./components/Footer";
import Menu from "./components/Menu";

import { Routes, Route, useMatch } from "react-router-dom";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const match = useMatch("/anecdotes/:id");
  const anec = match ? anecdoteById(Number(match.params.id)) : null;

  useEffect(() => {
    const notificationTimeout = setTimeout(() => {
      setNotification("");
    }, 5000);
    return () => clearTimeout(notificationTimeout);
  }, [notification]);

  return (
    <div>
      <h1>Software anecdotes</h1>

      <Menu />
      {notification && <div>{notification}</div>}
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/create"
          element={
            <CreateNew addNew={addNew} setNotification={setNotification} />
          }
        />
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anec} />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
