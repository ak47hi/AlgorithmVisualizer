import React, { useRef, useEffect } from "react";

export default function MyComponent() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Draw the initial shape with a background color of white
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Animate the color change to green with a delay of a second
    setInterval(() => {
      context.fillStyle = "green";
      context.fillRect(0, 0, canvas.width, canvas.height);
    }, 1000);
  }, []);

  return <canvas ref={canvasRef} />;
}
