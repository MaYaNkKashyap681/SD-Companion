import React, { useEffect, useRef, useState } from "react";

const Canvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas) {
            // Get the canvas's rendering context
            const ctx = canvas.getContext('2d');
            // Set the canvas's physical size (HD size)
            const hdWidth = 5000; // Adjust the desired width
            const hdHeight = 5000; // Adjust the desired height
            canvas.width = hdWidth;
            canvas.height = hdHeight;

            if (ctx) {
                // Set line width for high-definition lines
                ctx.lineWidth = 1; // Adjust this value as needed
                // Disable image smoothing
                ctx.imageSmoothingEnabled = false;
                // Set the grid spacing and grid color
                const gridSize = 40;
                const gridColor = "white";

                // Clear the canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Draw the vertical grid lines
                for (let x = 0; x < canvas.width; x += gridSize) {
                    ctx.beginPath();
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, canvas.height);
                    ctx.strokeStyle = gridColor;
                    ctx.stroke();
                }

                // Draw the horizontal grid lines
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


    const [scale, setScale] = useState<number>(1);

    const handleScaleIncrease = () => {
        if(scale === 2.5) {return;}
        setScale((prev) => prev + 0.5)
    }

    const handleScaleDecrease = () => {
        if(scale == 1) {return;}
        setScale((prev) => prev - 0.5)
    }
    return (
        <>
            <div className="fixed right-2 top-4 bg-white h-[3rem] w-[8rem] z-[50] rounded-md shadow-sm shadow-white flex items-center justify-center gap-2">
                <div className={`bg-blue-400 p-2 rounded-full flex items-center justify-center w-[2rem] h-[2rem] text-3xl hover:bg-opacity-60 cursor-pointer ${scale === 1 ? 'opacity-50' : ''}`}  onClick={handleScaleDecrease}><span className="mb-[0.5rem]">-</span></div>
                {scale * 100}%
                <div className={`bg-blue-400 p-2 rounded-full flex items-center justify-center w-[2rem] h-[2rem] text-3xl hover:bg-opacity-60 cursor-pointer ${scale === 2.5 ? 'opacity-50' : ''}`}  onClick={handleScaleIncrease}><span className="mb-[0.5rem]">+</span></div>
            </div>

            <div className="h-screen w-screen relative">
                <canvas
                    ref={canvasRef}
                    className="bg-[#000000] min-w-full min-h-full"
                    style={{
                        scale: scale * 100 + '%'
                    }}
                ></canvas>
            </div >
        </>
    );
};

export default Canvas;
