import { useEffect, useRef, useState } from "react";

interface SquaresProps {
  direction?: "diagonal" | "up" | "right" | "down" | "left";
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverColor?: string;
}

export default function Squares({
  direction = "diagonal",
  speed = 0.5,
  borderColor = "rgba(148, 163, 184, 0.08)", // تیره/روشن کمرنگ
  squareSize = 40,
  hoverColor = "rgba(59, 130, 246, 0.15)", // آبی ملایم موقع هاور
}: SquaresProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredSquare, setHoveredSquare] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let gridOffset = { x: 0, y: 0 };

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - gridOffset.x;
      const mouseY = e.clientY - rect.top - gridOffset.y;
      setHoveredSquare({
        x: Math.floor(mouseX / squareSize),
        y: Math.floor(mouseY / squareSize),
      });
    };

    const handleMouseLeave = () => setHoveredSquare(null);

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // افکت حرکت پس‌زمینه
      if (direction === "diagonal") {
        gridOffset.x = (gridOffset.x - speed) % squareSize;
        gridOffset.y = (gridOffset.y - speed) % squareSize;
      } else if (direction === "right") gridOffset.x = (gridOffset.x + speed) % squareSize;
      else if (direction === "left") gridOffset.x = (gridOffset.x - speed) % squareSize;
      else if (direction === "up") gridOffset.y = (gridOffset.y - speed) % squareSize;
      else if (direction === "down") gridOffset.y = (gridOffset.y + speed) % squareSize;

      const numCols = Math.ceil(canvas.width / squareSize) + 2;
      const numRows = Math.ceil(canvas.height / squareSize) + 2;

      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;

      for (let i = -1; i < numCols; i++) {
        for (let j = -1; j < numRows; j++) {
          const x = i * squareSize + gridOffset.x;
          const y = j * squareSize + gridOffset.y;

          // روشن کردن سلول اگر موس رویش بود
          if (hoveredSquare && hoveredSquare.x === i && hoveredSquare.y === j) {
            ctx.fillStyle = hoverColor;
            ctx.fillRect(x, y, squareSize, squareSize);
          }

          ctx.strokeRect(x, y, squareSize, squareSize);
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [direction, speed, borderColor, squareSize, hoverColor, hoveredSquare]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}