import { Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, SphereGeometry, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

import Experience from "./Experience";


export default class Camera {

    experience: Experience;
    instance!: PerspectiveCamera;
    scene: Scene;
    canvas?: HTMLElement;
    controls!: OrbitControls;
    cameraTarget!: Mesh;

    
    constructor() {
        
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.setInstance();
        this.setCameraTarget();
        this.setOrbitControls();

    }

    setInstance() {
        this.instance = new PerspectiveCamera(75, this.experience.width / this.experience.height, 0.1, 1000);
        this.instance.position.set(0, 0, 5);
        this.scene.add(this.instance);
    }

    setCameraTarget() {
        this.cameraTarget = new Mesh(
            new SphereGeometry(0, 4, 4),
            new MeshBasicMaterial({ color: 'white', wireframe: true })
        );
        this.cameraTarget.position.set(0, 0, 0);
        this.scene.add(this.cameraTarget);

        this.instance.lookAt(this.cameraTarget.position);
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.instance, this.canvas!);
        this.controls.target.copy(this.cameraTarget.position);
        this.controls.enableDamping = true;
    }

    resize() {
        this.instance.aspect = this.experience.width / this.experience.height;
        this.instance.updateProjectionMatrix();
    }

    update() {
        this.controls.update();
        
        this.instance.lookAt(this.cameraTarget.position);
    }

}