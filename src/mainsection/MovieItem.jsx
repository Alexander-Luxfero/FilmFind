/* eslint-disable react/prop-types */
//import { useEffect } from "react";

export default function MovieItem({
  imdbID,
  Poster,
  Title,
  Year,

  imdbRating,
  userRating,
  runtime,

  isNotWatched,
  selectedId,
  setSelectedId,

  setWatched,
}) {
  // useEffect(
  //   function () {
  //     if (selectedId === imdbID) {
  //       document.title = `Movie | ${Title}`;
  //     }
  //   },
  //   [selectedId]
  // );

  return (
    <li
      onClick={() =>
        selectedId !== imdbID ? setSelectedId(imdbID) : setSelectedId(null)
      }
    >
      <img src={Poster} alt={`${Title} poster`} />
      <h3>{Title}</h3>
      {isNotWatched ? (
        <div>
          <p>
            <span>🗓</span>
            <span>{Year}</span>
          </p>
        </div>
      ) : (
        <div>
          <p>
            <span>⭐️</span>
            <span>{imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{runtime} min</span>
          </p>
          <button
            className="btn-delete"
            onClick={() => {
              setWatched((prev) =>
                prev.filter((item) => item.imdbID !== imdbID)
              );
              setSelectedId(null);
            }}
          >
            X
          </button>
        </div>
      )}
    </li>
  );
}
