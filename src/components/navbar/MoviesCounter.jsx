/* eslint-disable react/prop-types */

export default function MoviesCounter({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
