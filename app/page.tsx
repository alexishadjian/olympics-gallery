"use client"

import { useEffect, useRef } from "react";
import Experience from "@/threejs/Experience";
import { OlympicsLogoAnimated, OlympicsBgLogo } from '@/images';
import Image from "next/image";
import './page.scss';


export default function Home() {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            new Experience(canvasRef.current)
        }
    })

    return (
        <div className="home">
            {/* <div className="grid marker">
                {Array.from({ length: 12 }).map((_, index) => (
                    <div key={index} className="s_1column"></div>
                ))}
            </div> */}

            <div className="bg-logo-container flex center">
                <Image 
                    src={OlympicsBgLogo}
                    alt="Olympcis background logo"
                    style={{ width: '100%', height: 'auto', padding: '8%' }}
                />
            </div>

            <canvas ref={canvasRef} className="webgl"></canvas>

            <div className="overlay flex center">
                <div className="content flex center column">
                    <Image 
                        src={OlympicsLogoAnimated}
                        alt="Olympcis logo"
                        style={{ width: '100%', height: 'auto', padding: '14% 30%' }}
                    />
                    <div className="loading-bar">
                        <div className="indicator"></div>
                    </div>
                </div>
            </div>

        </div>
    );
}