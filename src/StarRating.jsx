/* eslint-disable react/prop-types */
import { useState } from "react";
import PropTypes from "prop-types";

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
  gap: "4px",
};

StarRating.propTypes = {
  maxRaiting: PropTypes.number,
  size: PropTypes.number,
  defaultRating: PropTypes.number,
  color: PropTypes.string,
  messages: PropTypes.array,
};

//Max rating is 10, and whatever, if we will use 5 Stars grade system or anithing else,
//we will recive scaled to biggest number value
export default function StarRating({
  maxRaiting = 10,
  color = "#fcc419",
  size = 48,
  className = "",
  messages = [],
  defaultRating = 0,
}) {
  const [hoverIndex, setHoverIndex] = useState(0);
  const [rating, setRating] = useState(defaultRating);

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.8}px`,
  };

  return (
    <div style={containerStyle} className={className}>
      <div
        style={starContainerStyle}
        className="stars"
        onMouseLeave={() => setHoverIndex(0)}
      >
        {Array.from({ length: maxRaiting }, (_, i) => (
          <Star
            color={color}
            size={size}
            key={i}
            rating={rating}
            onMouseEnter={() => setHoverIndex(i + 1)}
            onClick={() => setRating(Math.round(i + 1) / (maxRaiting / 10))}
            isGold={i + 1 <= hoverIndex || i + 1 <= rating}
          />
        ))}
      </div>
      <p style={textStyle}>
        {!messages && (hoverIndex !== 0 || rating !== 0)
          ? (hoverIndex || rating) + "/" + maxRaiting
          : messages && rating !== 0
          ? messages[Math.round((rating - 2) / 2)]
          : messages && hoverIndex !== 0
          ? messages[Math.round((hoverIndex - 2) / 2)]
          : ""}
      </p>
    </div>
  );
}

function Star({ isGold, onMouseEnter, onClick, color, size }) {
  const starStyle = {
    dispaly: "block",
    cursor: "pointer",
    width: `${size}px`,
    height: `${size}px`,
  };
  const starIcon = isGold ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill={color}
      stroke={color}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke={color}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="{1}"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );

  return (
    <span
      role="button"
      style={starStyle}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      {starIcon}
    </span>
  );
}
