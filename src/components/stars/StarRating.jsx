/* eslint-disable react/prop-types */
import { useState } from "react";
import PropTypes from "prop-types";
import Star from "./Star";

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
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
  rating,
  setRating,
}) {
  const [hoverIndex, setHoverIndex] = useState(0);

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color: { color },
    fontSize: `${size / 1.5}px`,
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
        {messages.length === 0 && (hoverIndex !== 0 || rating !== 0)
          ? hoverIndex || rating
          : messages.length >= 1 && rating !== 0
          ? messages[Math.round((rating - 2) / 2)]
          : messages.length >= 1 && hoverIndex !== 0
          ? messages[Math.round((hoverIndex - 2) / 2)]
          : ""}
      </p>
    </div>
  );
}
