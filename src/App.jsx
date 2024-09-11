import { useState } from "react";
import { tempMovieData } from "./tempMovieData";
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

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <MoviesCounter movies={movies} />
      </NavBar>
      <MainSection>
        <ContentBox>
          <MovieList movies={movies} isNotWatched={true} />
        </ContentBox>

        <ContentBox>
          <WatchedMovieSummary watched={watched} />
          <MovieList movies={watched} isNotWatched={false} />
        </ContentBox>
      </MainSection>
    </>
  );
}
