"use client";

import { useEffect, useRef } from "react";

const blobs = [
  "M40,70C20,60 5,45 15,25C25,5 50,10 65,20C80,30 85,55 70,70C55,85 60,80 40,70Z",
  "M35,75C15,65 5,40 20,20C35,0 60,5 75,20C90,35 85,60 70,75C55,90 50,85 35,75Z",
  "M45,65C25,55 10,30 25,15C40,0 65,10 80,25C90,40 75,65 60,75C45,85 65,75 45,65Z",
  "M30,70C10,60 0,35 15,20C30,5 55,0 70,15C85,30 80,55 65,70C50,85 45,80 30,70Z",
];

export default function MorphingBlob({ className = "" }) {
  const pathRef = useRef(null);

  useEffect(() => {
    let frame;
    let startTime = Date.now();
    const duration = 6000;
    let skip = false;

    function animate() {
      skip = !skip;
      if (!skip) {
        frame = requestAnimationFrame(animate);
        return;
      }

      const elapsed = Date.now() - startTime;
      const progress = (elapsed % duration) / duration;
      const current = Math.floor(progress * blobs.length) % blobs.length;
      const next = (current + 1) % blobs.length;
      const t = (progress * blobs.length) % 1;

      if (pathRef.current) {
        const currPoints = parsePoints(blobs[current]);
        const nextPoints = parsePoints(blobs[next]);
        const morphed = currPoints.map((p, i) => ({
          x: p.x + (nextPoints[i].x - p.x) * easeInOut(t),
          y: p.y + (nextPoints[i].y - p.y) * easeInOut(t),
        }));
        pathRef.current.setAttribute("d", toPath(morphed));
      }
      frame = requestAnimationFrame(animate);
    }

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <svg
      viewBox="0 0 100 100"
      className={`absolute pointer-events-none ${className}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="blobGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <path
        ref={pathRef}
        d={blobs[0]}
        fill="url(#blobGrad)"
        opacity={0.15}
      />
    </svg>
  );
}

function parsePoints(d) {
  return d
    .replace(/[MZC]/g, "")
    .trim()
    .split(/\s+/)
    .map((pair) => {
      const [x, y] = pair.split(",").map(Number);
      return { x, y };
    });
}

function toPath(points) {
  return "M" + points.map((p) => `${p.x},${p.y}`).join(" ") + "Z";
}

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
