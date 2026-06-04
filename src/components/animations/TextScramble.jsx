"use client";

import { useState, useCallback, useRef } from "react";

const chars = "!<>-_\\/[]{}—=+*^?#________";

export default function TextScramble({ children, className = "", as: Tag = "span" }) {
  const [display, setDisplay] = useState(children);
  const intervalRef = useRef(null);
  const original = children;

  const handleMouseEnter = useCallback(() => {
    let iteration = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const str = original
        .split("")
        .map((char, i) => {
          if (i < iteration) return original[i];
          if (char === " ") return " ";
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      setDisplay(str);

      if (iteration >= original.length) {
        clearInterval(intervalRef.current);
        setDisplay(original);
      }

      iteration += 1 / 3;
    }, 30);
  }, [original]);

  const handleMouseLeave = useCallback(() => {
    clearInterval(intervalRef.current);
    setDisplay(original);
  }, [original]);

  return (
    <Tag
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {display}
    </Tag>
  );
}
