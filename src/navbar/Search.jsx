/* eslint-disable react/prop-types */
import { useState } from "react";

export default function Search({ querySearch, setQuerySearch }) {
  const [query, setQuery] = useState(querySearch);
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") setQuerySearch(e.target.value);
      }}
    />
  );
}
