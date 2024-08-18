import { Clock } from "three";
import Experience from "@/threejs/Experience";

export default class Time {
    
    start: number;
    current: number;
    elapsed: number;
    delta: number;
    elapsedTime!: number;
    clock: Clock;
    experience: Experience;
    id: number;
    
    constructor() {
        // Options
        this.experience = new Experience();
        this.start = Date.now();
        this.clock = new Clock();

        this.current = this.start;
        this.elapsed = 0;
        this.delta = 16;

        this.id = requestAnimationFrame(() => { this.tick() });
    }


    tick() {
        const currentTime = Date.now();
        this.delta = currentTime - this.current;
        this.current = currentTime;
        this.elapsed = this.current - this.start;
        this.elapsedTime = this.clock.getElapsedTime();
        
        this.experience.update();
        
        this.id = requestAnimationFrame(() => { this.tick() });
    }

    stop() {        
        cancelAnimationFrame(this.id);
    }
}