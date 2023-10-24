import React, { useEffect, useRef, useState } from "react";
import { ComponentsInterface, data } from "../constants";

const ComponentCard: React.FC<ComponentsInterface> = ({ img, name }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({img}));
  };

  return (
    <div
      className="h-[8rem] flex flex-col items-center text-center border-[2px] border-black rounded-lg p-2 relative cursor-pointer hover:border-blue-400"
      draggable={true}
      onDragStart={handleDragStart}
    >
      <img src={img} className="w-full h-full" alt={name} />
      <p className="absolute top-0 left-0 bg-white w-fit shadow-md rounded-mt">
        {name}
      </p>
    </div>
  );
};

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scale, setScale] = useState<number>(1);
  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");
      const hdWidth = 5000;
      const hdHeight = 5000;
      canvas.width = hdWidth;
      canvas.height = hdHeight;

      if (ctx) {
        ctx.lineWidth = 1;
        ctx.imageSmoothingEnabled = false;
        const gridSize = 40;
        const gridColor = "black";

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let x = 0; x < canvas.width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.strokeStyle = gridColor;
          ctx.stroke();
        }

        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.strokeStyle = gridColor;
          ctx.stroke();
        }
      }
    }
  }, []);

  const handleScaleIncrease = () => {
    if (scale === 2.5) {
      return;
    }
    setScale((prev) => prev + 0.5);
  };

  const handleScaleDecrease = () => {
    if (scale === 1) {
      return;
    }
    setScale((prev) => prev - 0.5);
  };

  const handleCanvasDrop = (e: React.DragEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");

    if (data) {
      const { img } = JSON.parse(data);
      const canvas = canvasRef.current;

      if (canvas) {
        const ctx = canvas.getContext("2d");

        if (ctx) {
          const image = new Image();
          image.src = img;
          image.width = 20;
          image.height = 20
          image.onload = () => {
            ctx.drawImage(
              image,
              e.clientX,
              e.clientY 
            );
          }
        }
      }
    }
  };

  const handleCanvasDragOver = (e: React.DragEvent<HTMLCanvasElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="fixed right-2 top-4 bg-white h-[3rem] w-[8rem] z-[50] rounded-md shadow-sm shadow-white flex items-center justify-center gap-2">
        <div
          className={`bg-blue-400 p-2 rounded-full flex items-center justify-center w-[2rem] h-[2rem] text-3xl hover-bg-opacity-60 cursor-pointer ${
            scale === 1 ? "opacity-50" : ""
          }`}
          onClick={handleScaleDecrease}
        >
          <span className="mb-[0.5rem]">-</span>
        </div>
        {scale * 100}%
        <div
          className={`bg-blue-400 p-2 rounded-full flex items-center justify-center w-[2rem] h-[2rem] text-3xl hover-bg-opacity-60 cursor-pointer ${
            scale === 2.5 ? "opacity-50" : ""
          }`}
          onClick={handleScaleIncrease}
        >
          <span className="mb-[0.5rem]">+</span>
        </div>
      </div>

      <div className="w-[300px] h-[100vh] fixed z-[50] p-2">
        <div className="bg-white w-full h-full rounded-2xl shadow-lg overflow-y-auto border-[4px] border-[#000000]">
          <h4 className="text-center font-bold">Components</h4>
          <div className="mt-[2rem] grid grid-cols-2 gap-8 p-2">
            {data.map((item, index) => (
              <ComponentCard {...item} key={index} />
            ))}
          </div>
        </div>
      </div>

      <div className="h-screen w-screen relative">
        <canvas
          ref={canvasRef}
          className="bg-white min-w-full min-h-full"
          style={{
            transform: `scale(${scale})`,
          }}
          onDrop={handleCanvasDrop}
          onDragOver={handleCanvasDragOver}
        ></canvas>
      </div>
    </>
  );
};

export default Canvas;
