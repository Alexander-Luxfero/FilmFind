/* eslint-disable react/prop-types */
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
}) {
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
        </div>
      )}
    </li>
  );
}
