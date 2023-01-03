import React, { useRef, useEffect } from "react";

const ColorChangeAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set the initial fill style to green
    ctx.fillStyle = `hsl(50 , 100%, 50%)`;

    // Draw the shape
    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    ctx.fill();

    let start = null;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;

      // Update the fill style based on the progress of the animation
      ctx.fillStyle = `hsl(${50 + progress / 10}, 100%, 50%)`;

      // Clear the canvas and redraw the shape with the updated fill style
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.moveTo(75, 50);
      ctx.lineTo(100, 75);
      ctx.lineTo(100, 25);
      ctx.fill();

      // If the animation is not complete, request another frame
      if (progress < 1000) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return <canvas ref={canvasRef} width={200} height={100} />;
};

export default ColorChangeAnimation;
