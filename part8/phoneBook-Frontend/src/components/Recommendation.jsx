import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Recommendation = (props) => {
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: props.token?.favoriteGenre },
  });

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (result.error) {
    return <div>Error {result.error.message}</div>;
  }

  return (
    <div>
      <h1>Recommendations</h1>
      <p>Books in your favorite genre: {props.token.favoriteGenre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendation;
