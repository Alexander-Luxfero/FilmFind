/* eslint-disable react/prop-types */
export default function ErrorMessage({ message }) {
  if (message === "signal is aborted without reason") {
    return (
      <p className="error">
        <span>🔍</span> Type something in Search movies...
      </p>
    );
  } else {
    return (
      <p className="error">
        <span>😿</span> {message}
      </p>
    );
  }
}
