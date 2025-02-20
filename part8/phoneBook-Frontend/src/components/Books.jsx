import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState, useEffect } from "react";

const Books = (props) => {
  const [genre, setGenre] = useState("");
  const result = useQuery(ALL_BOOKS, { variables: { genre: genre } });
  const [genres, setGenres] = useState(new Set());

  useEffect(() => {
    if (result.data) {
      setGenres((prev) => {
        const newGenres = new Set(prev);
        result.data.allBooks.forEach((book) => {
          book.genres.forEach((genre) => {
            newGenres.add(genre);
          });
        });
        return newGenres;
      });
    }
  }, [result.data]);

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (result.error) {
    return <div>Error {result.error.message}</div>;
  }

  if (!props.show) {
    return null;
  }

  const books = result.data.allBooks;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {[...genres].map((genre) => (
        <button key={genre} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setGenre("")}>All genres</button>
    </div>
  );
};

export default Books;
