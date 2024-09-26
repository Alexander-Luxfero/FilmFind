/* eslint-disable react/prop-types */
// import ToggleButton from "./ToggleButton";
import { useState } from "react";

export default function ContentBox({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      {/* <ToggleButton isOpen={isOpen} setIsOpen={setIsOpen} /> */}
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
