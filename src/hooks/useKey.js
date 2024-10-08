import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      const callback = (e) =>
        e.code.toLowerCase() === key.toLowerCase() && action(null);

      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [action, key]
  );
}
