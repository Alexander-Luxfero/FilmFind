import { useState } from "react";
// import { tempMovieData } from "./tempMovieData";
// import { tempWatchedData } from "./tempWatchedData";

import NavBar from "./components/navbar/NavBar.jsx";
import MainSection from "./components/mainsection/MainSection";
//Components of navigation bar
import Search from "./components/navbar/Search.jsx";
import Logo from "./components/navbar/Logo.jsx";
import MoviesCounter from "./components/navbar/MoviesCounter.jsx";
//Components for main section
import ContentBox from "./components/mainsection/ContentBox";
import MovieList from "./components/mainsection/MovieList.jsx";
import WatchedMovieSummary from "./components/mainsection/WatchedMovieSummary";
import MovieExibition from "./components/mainsection/MovieExibition.jsx";
import UnwatchedMovieList from "./components/mainsection/UnwatchedMovieList.jsx";
//hooks
import { useLockalStorage } from "./hooks/useLockalStorage.js";

export default function App() {
  const [movies, setMovies] = useState([]);

  const [querySearch, setQuerySearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const [watched, setWatched] = useLockalStorage([], "watched");

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
