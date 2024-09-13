/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Loading from "./Loading";
import StarRating from "../stars/StarRating";
import ErrorMessage from "./ErrorMessage";

//KEY for fatching movie data
const KEY = "15448fa5";

export default function MovieExibition({
  selectedId,
  setSelectedId,
  watched,
  setWatched,
}) {
  const [md, setMovieDetails] = useState([]);
  //handle loading and errors
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [rating, setRating] = useState(0);

  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setError("");
          setIsLoading(true);

          //****************************************************** */
          const watchedMovie = watched.filter(
            (item) => item.imdbID === selectedId
          );
          if (watchedMovie.length >= 1) {
            console.log(watchedMovie.at(0).userRating);
            setRating(watchedMovie.at(0).userRating);
          } else {
            console.log("set Rating is equal 0");
            setRating(0);
          }
          //****************************************************** */

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );
          if (!res.ok) throw new Error("Missing internet conection...");

          const data = await res.json();

          console.log(data);
          setMovieDetails(data);
        } catch (error) {
          console.error(error);
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }

      getMovieDetails();
    },
    [selectedId]
  );

  function handleAddToWatched() {
    setWatched((prev) => {
      const watchedMovie = watched.filter((item) => item.imdbID === selectedId);
      if (watchedMovie.length === 0) {
        return [
          ...prev,
          {
            imdbID: md.imdbID,
            Title: md.Title,
            Year: md.Year,
            Poster: md.Poster,
            runtime: Number(md.Runtime.split(" ")[0]),
            imdbRating: Number(md.imdbRating),
            userRating: rating,
          },
        ];
      }
    });
  }

  return (
    <div key={selectedId} className="details">
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
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
            <div className="rating darker">
              {watched.filter((item) => item.imdbID === selectedId).length >=
              1 ? (
                <em>You reted this movie whith rate {rating}</em>
              ) : (
                <>
                  <StarRating
                    size={24}
                    watched={watched}
                    setWatched={setWatched}
                    rating={rating}
                    setRating={setRating}
                  />

                  <button className="btn-add" onClick={handleAddToWatched}>
                    + Add to list
                  </button>
                </>
              )}
            </div>

            <em>{md.Plot}</em>
            <p>Starring {md.Actors}</p>
            <p>Directored by {md.Director}</p>
          </div>
        </>
      )}
    </div>
  );
}
