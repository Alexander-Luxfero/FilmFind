/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
// import { tempMovieData } from "./tempMovieData";
import { tempWatchedData } from "./tempWatchedData";

import NavBar from "./navbar/NavBar";
import MainSection from "./mainsection/MainSection";
//Components of navigation bar
import Search from "./navbar/Search";
import Logo from "./navbar/Logo";
import MoviesCounter from "./navbar/MoviesCounter";
//Components for main section
import ContentBox from "./mainsection/ContentBox";
import MovieList from "./mainsection/MovieList";
import WatchedMovieSummary from "./mainsection/WatchedMovieSummary";

// import StarRating from "./stars/StarRating.jsx";
import Star from "./stars/Star.jsx";
import StarRating from "./stars/StarRating.jsx";

//Url for fatching movie data
const KEY = "15448fa5";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [querySearch, setQuerySearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedId, setSelectedId] = useState(null);

  useEffect(
    function () {
      async function fatchMovies() {
        try {
          setError("");
          setIsLoading(true);

          //if ok, go further and fatching data
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${querySearch}`
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
          setError(err.message);
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
    },
    [querySearch]
  );

  function ErrorMessage({ message }) {
    return (
      <p className="error">
        <span>🛑</span> {message}
      </p>
    );
  }

  return (
    <>
      <NavBar>
        <Logo />
        <Search querySearch={querySearch} setQuerySearch={setQuerySearch} />
        <MoviesCounter movies={movies} />
      </NavBar>
      <MainSection>
        <ContentBox>
          {isLoading && <Loading />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <MovieList
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              movies={movies}
              isNotWatched={true}
            />
          )}
        </ContentBox>

        <ContentBox>
          {selectedId !== null ? (
            <MovieExibition
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          ) : (
            <>
              <WatchedMovieSummary watched={watched} />
              <MovieList movies={watched} isNotWatched={false} />
            </>
          )}
        </ContentBox>
      </MainSection>
    </>
  );
}

export function MovieExibition({ selectedId, setSelectedId }) {
  const [md, setMovieDetails] = useState([]);
  useEffect(
    function () {
      async function getMovieDetails() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();

        console.log(data);
        setMovieDetails(data);
      }

      getMovieDetails();
    },
    [selectedId]
  );

  return (
    <div key={selectedId} className="details">
      <button className="btn-back" onClick={() => setSelectedId(null)}>
        &larr;
      </button>
      <header>
        <img src={md.Poster} alt="404" />
        <section>
          <h2>{md.Title}</h2>
          <p>
            {md.Released} - {md.Runtime}
          </p>
          <p>{md.Genre}</p>
          <p>
            <img
              src="./star.svg"
              alt=""
              style={{
                height: "15px",
                width: "15px",
                marginRight: "5px",
              }}
            />
            {md.imdbRating} IMDb rating
          </p>
        </section>
      </header>
      <div className="details-overview">
        <StarRating size={30} className="darker" />

        <em>{md.Plot}</em>
        <p>Starring {md.Actors}</p>
        <p>Directored by {md.Director}</p>
      </div>
    </div>
  );
}

export function Loading() {
  return <p className="loader">Loading...</p>;
}
