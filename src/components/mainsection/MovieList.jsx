/* eslint-disable react/prop-types */
import MovieItem from "./MovieItem";

export default function MovieList({
  movies,
  isNotWatched,
  selectedId,
  setSelectedId,
  setWatched,
}) {
  return (
    <ul className="list">
      {movies.map((movie, index) => (
        <MovieItem
          index={index}
          key={movie.imdbID}
          {...movie}
          isNotWatched={isNotWatched}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          setWatched={setWatched}
        />
      ))}
    </ul>
  );
}
