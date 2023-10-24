import React, { useRef, useState } from "react";
import Draggable from "react-draggable";
import { ComponentsInterface, data } from "../constants";

const ComponentCard: React.FC<ComponentsInterface> = ({ img, name }) => {
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData("text/plain", JSON.stringify({ img, name }));
    };

    return (
        <div
            className="h-[8rem] flex flex-col items-center text-center border-[2px] border-black rounded-lg p-2 relative cursor-pointer hover:border-blue-400"
            draggable={true}
            onDragStart={handleDragStart}
        >
            <img src={img} className="w-full h-full" alt={name} />
            <p className="absolute top-1 left-1 bg-white w-fit shadow-md rounded-mt text-sm font-semibold p-2 rounded-xl">
                {name}
            </p>
        </div>
    );
};

const Canvas: React.FC = () => {
    const [scale, setScale] = useState<number>(1);
    const [elements, setElements] = useState<any[]>([]);
    const canvasRef = useRef<HTMLDivElement | null>(null);

    const createNewElement = (img: string, name: string, x: number, y: number) => {
        const newElement = {
            img,
            name,
            x,
            y,
        };
        setElements([...elements, newElement]);
    };

    const updateElementPosition = (index: number, x: number, y: number) => {
        const updatedElements = [...elements];
        updatedElements[index] = {
            ...updatedElements[index],
            x,
            y,
        };
        setElements(updatedElements);
    };

    const handleCanvasDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");

        if (data) {
            const { img, name } = JSON.parse(data);

            const canvas = canvasRef.current;

            if (canvas) {
                const offsetX = e.clientX - canvas.offsetLeft;
                const offsetY = e.clientY - canvas.offsetTop;

                createNewElement(img, name, offsetX, offsetY);
            }
        }
    };

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

    return (
        <>
            <div className="fixed right-2 top-4 bg-white h-[3rem] w-[8rem] z-[50] rounded-md shadow-sm shadow-white flex items-center justify-center gap-2">
                <div
                    className={`bg-blue-400 p-2 rounded-full flex items-center justify-center w-[2rem] h-[2rem] text-3xl hover-bg-opacity-60 cursor-pointer ${scale === 1 ? "opacity-50" : ""
                        }`}
                    onClick={handleScaleDecrease}
                >
                    <span className="mb-[0.5rem]">-</span>
                </div>
                {scale * 100}%
                <div
                    className={`bg-blue-400 p-2 rounded-full flex items-center justify-center w-[2rem] h-[2rem] text-3xl hover-bg-opacity-60 cursor-pointer ${scale === 2.5 ? "opacity-50" : ""
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

            <div className="h-screen w-screen relative overflow-scroll">
                <div
                    ref={canvasRef}
                    onDrop={handleCanvasDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className="bg-white min-w-full min-h-full"
                    style={{
                        transform: `scale(${scale})`,
                        position: "relative",
                        width: "5000px", // Adjust the width as needed
                        height: "5000px", // Adjust the height as needed
                    }}
                >
                    {elements.map((element, index) => (
                        <Draggable
                            key={index}
                            position={{ x: element.x, y: element.y }}
                            onDrag={(e, data) => {
                                updateElementPosition(index, data.x, data.y);
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                }}
                            >
                                <img src={element.img} alt={element.name} />
                            </div>
                        </Draggable>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Canvas;
