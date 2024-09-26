/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

export default function Search({ querySearch, setQuerySearch }) {
  // const [query, setQuery] = useState(querySearch);
  const inputEl = useRef(null);

  useEffect(() => {
    function callback(e) {
      if (document.activeElement === inputEl.current) return;
      if (e.code === "Enter") {
        inputEl.current.focus();
        setQuerySearch("");
      }
    }
    document.addEventListener("keydown", callback);
    return () => document.addEventListener("keydown", callback);
  }, [setQuerySearch]);

  // useEffect(function () {
  //   const el = document.querySelector(".search");
  //   el.focus();
  // }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={querySearch}
      onChange={(e) => setQuerySearch(e.target.value)}
      // onKeyDown={(e) => {
      //   if (e.key === "Enter") setQuerySearch(e.target.value);
      // }}
      ref={inputEl}
    />
  );
}
