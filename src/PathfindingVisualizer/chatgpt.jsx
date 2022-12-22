import React, { useRef, useEffect } from "react";

const CircleCanvas = () => {
  const canvasRef = useRef(null);
  const colorRef = useRef("blue");

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.arc(100, 100, 50, 0, 2 * Math.PI);
    ctx.fillStyle = colorRef.current;
    ctx.fill();
  }, []);

  const handleMouseEnter = () => {
    colorRef.current = "red";
    updateCanvas();
  };

  const handleMouseLeave = () => {
    colorRef.current = "blue";
    updateCanvas();
  };

  const updateCanvas = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.arc(100, 100, 50, 0, 2 * Math.PI);
    ctx.fillStyle = colorRef.current;
    ctx.fill();
  };

  return (
    <div>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ position: "relative" }}
      >
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          style={{ position: "absolute" }}
        />
      </div>
    </div>
  );
};

export default CircleCanvas;
