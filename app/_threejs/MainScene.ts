import { AxesHelper, Scene } from 'three';

import Lights from "./components/Lights";
import Cube from './components/Cube';


export default class MainScene extends Scene {

    lights!: Lights;
    axesHelper!: AxesHelper;
    cube!: Cube;

    constructor() {

        super();

        this.buildScene();
        this.setLights();        
    }


    buildScene() {
        this.axesHelper = new AxesHelper(5);
        this.axesHelper.position.y = 0.5;
        this.add(this.axesHelper);

        this.cube = new Cube(2, 2, 2);
        this.cube.mesh.position.y = 0.5;
        this.add(this.cube.mesh)
    }

    setLights() {
        this.lights = new Lights();
        this.add(this.lights.ambientLight);
    }

    update() {
        this.cube.update();
    }
}