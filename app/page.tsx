"use client"

import { useEffect, useRef } from "react";
import Experience from "./_threejs/Experience";


export default function Home() {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            const experience = new Experience(canvasRef.current)
        }
    })

    return (
        <div className="home">
            {/* <div className="grid marker">
                {Array.from({ length: 12 }).map((_, index) => (
                    <div key={index} className="s_1column"></div>
                ))}
            </div> */}
            <canvas 
                ref={canvasRef} 
                className="webgl"
                style={{
                    position: 'fixed',
                    width: '100%',
                    height: '100%',
                    outline: 'none',
                    inset: 0,
                    // zIndex: -1
                }}
            >
            </canvas>
        </div>
    );
}