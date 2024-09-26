/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import MovieList from "./MovieList";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
// import { useFatchMovies } from "../useFatchMovies";

//KEY for fatching movie data
const KEY = "15448fa5";

export default function UnwatchedMovieList({
  querySearch,
  movies,
  setMovies,
  selectedId,
  setSelectedId,
}) {
  // const { error, isLoading, movies } = useFatchMovies(setMovies, querySearch);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      async function fatchMovies() {
        try {
          setError("");
          setIsLoading(true);

          //if ok, go further and fatching data
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${querySearch}`,
            { signal: controller.signal }
          );

          //Check if everything ok, and if not throw error
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          //And if and this ok make json from data
          const data = await res.json();

          //If we dont have movie/s with this name, throwing an error
          if (data.Response === "False") throw new Error("Movie is not found.");

          //OK -> creating movie list and finaly switch loading off
          console.log(data);
          setMovies(data.Search);
        } catch (err) {
          console.error(err.message);
          if (err.name !== "Abort") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      //In case when we do not start to search some movie sat movies list as empty
      if (!querySearch) {
        setMovies([]);
        setError("");
        return;
      }

      fatchMovies();

      return function () {
        controller.abort();
      };
    },
    [querySearch]
  );

  return (
    <>
      {isLoading && <Loading />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && (
        <MovieList
          movies={movies}
          isNotWatched={true}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      )}
    </>
  );
}
