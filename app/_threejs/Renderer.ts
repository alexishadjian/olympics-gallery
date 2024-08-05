import { Scene, WebGLRenderer } from "three";
import Experience from "./Experience";

export default class Renderer {

    experience: Experience;
    instance!: WebGLRenderer;
    scene!: Scene;

    constructor() {

        this.experience = new Experience();

        this.setInstance();
    }

    setInstance() {
        this.instance = new WebGLRenderer({
            canvas: this.experience.canvas,
            antialias: true,
            alpha: true,
        });

        this.instance.setSize(this.experience.width, this.experience.height);
        this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    resize() {        
        this.instance.setSize(this.experience.width, this.experience.height);
        this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));        
    }

    update() {        
        this.instance.render(this.experience.scene, this.experience.camera.instance);        
    }
}