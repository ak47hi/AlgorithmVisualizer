import React, { useRef, useEffect } from "react";

export default function Hexagon() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set the fill style to red
    ctx.fillStyle = "red";

    // Begin the path
    ctx.beginPath();

    // Calculate the coordinates for the hexagon vertices
    const radius = 100;
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    for (let i = 0; i < 6; i++) {
      const angle = (2 * Math.PI * i) / 6;
      const xPos = x + radius * Math.cos(angle);
      const yPos = y + radius * Math.sin(angle);
      ctx.lineTo(xPos, yPos);
    }

    // Close the path and fill the hexagon
    ctx.closePath();
    ctx.fill();
  }, []);

  return <canvas height="200" width="200" ref={canvasRef} />;
}
