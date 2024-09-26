/*Due to unequality of codes in lecture and in my project, 
make this custom hook is currently to difficult, and takes tooo much time
*/
import { useState, useEffect } from "react";

//KEY for fatching movie data
const KEY = "15448fa5";

//Function taken from UnwatchedMovieList.jsx, and not prepared
//to insert in another parts without preparation
export function useFatchMovies({ querySearch, moviesItems }) {
  const [movies, setMovies] = useState(moviesItems);
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
    [querySearch, setMovies]
  );

  return { isLoading, error, movies };
}
