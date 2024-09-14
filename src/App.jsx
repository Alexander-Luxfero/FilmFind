import { useState } from "react";
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
import MovieList from "./mainsection/MovieList.jsx";
import WatchedMovieSummary from "./mainsection/WatchedMovieSummary";
import MovieExibition from "./mainsection/MovieExibition.jsx";
import UnwatchedMovieList from "./mainsection/UnwatchedMovieList.jsx";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [querySearch, setQuerySearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  return (
    <>
      <NavBar>
        <Logo />
        <Search querySearch={querySearch} setQuerySearch={setQuerySearch} />
        <MoviesCounter movies={movies} />
      </NavBar>
      <MainSection>
        <ContentBox>
          <UnwatchedMovieList
            querySearch={querySearch}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            movies={movies}
            setMovies={setMovies}
          />
        </ContentBox>

        <ContentBox>
          {selectedId !== null ? (
            <MovieExibition
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              watched={watched}
              setWatched={setWatched}
            />
          ) : (
            <>
              <WatchedMovieSummary watched={watched} />
              <MovieList
                movies={watched}
                isNotWatched={false}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                setWatched={setWatched}
              />
            </>
          )}
        </ContentBox>
      </MainSection>
    </>
  );
}
