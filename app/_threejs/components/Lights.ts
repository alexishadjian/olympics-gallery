import { AmbientLight, Scene } from "three";
import Experience from "../Experience";

export default class Lights {

    experience: Experience;
    ambientLight!: AmbientLight;
    debug: any;
    debugFolder: any;

    constructor() {
        // Options
        this.experience = new Experience();
        this.debug = this.experience.debug;

        
        this.setAmbientLight();

        // Debug
        if(this.debug?.active) {
            // Debug group
            this.debugFolder = this.debug.ui.addFolder('Lights');

            // Debug property
            this.debugFolder.add(this.ambientLight, 'intensity').min(0).max(0.5).step(0.001).name('Ambient light');
        }
    }

    setAmbientLight() {
        this.ambientLight = new AmbientLight(0xffffff, 0.05);
    }
}