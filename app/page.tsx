"use client"

import { useEffect, useRef } from "react";
import Experience from "@/threejs/Experience";
import { OlympicsLogoAnimated, OlympicsBgLogo, Cross } from '@/images';
import Image from "next/image";
import './page.scss';


export default function Home() {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    let experience: Experience;

    useEffect(() => {
        if (canvasRef.current) {
            experience = new Experience(canvasRef.current);
            console.log(experience);
            
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

            <div className="close-btn-container wrapper">
                <button className="close-btn is-hidden" onClick={() => { experience.scene.gallery.closeFullScreen() }}>
                    <Image src={Cross} width={30} alt="Cross"/> 
                </button>
            </div>

        </div>
    );
}