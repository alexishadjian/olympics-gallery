import { Mesh } from 'three';
import Time from '@/threejs/utils/Time';
import Camera from '@/threejs/Camera';
import Renderer from '@/threejs/Renderer';
import Loader from '@/threejs/utils/Loader';
import Debug from '@/threejs/utils/Debug';
import MainScene from '@/threejs/MainScene';

let instance: Experience | null = null;

export default class Experience {

    canvas?: HTMLElement;
    time!: Time;
    scene!: MainScene;
    loader!: Loader;
    camera!: Camera;
    renderer!: Renderer;
    debug!: Debug;
    width: number = innerWidth;
    height: number = innerHeight;
    resizeHandler: any;

    constructor(canvas?: HTMLElement) {
        
        // Singleton
        if (instance) return instance;
        instance = this;

        this.canvas = canvas;
        this.scene = new MainScene();

        // Set scene sizes
        this.width = innerWidth;
        this.height = innerHeight;
        
        this.debug = new Debug();
        this.time = new Time();
        this.loader = new Loader();

        // Set resize listener
        this.resizeHandler = () => { this.resize() };
        addEventListener('resize', this.resizeHandler);
    }

    onResourcesLoaded() {
        this.scene.buildScene();
        this.camera = new Camera();
        this.renderer = new Renderer();
    }

    resize() {
        this.width = innerWidth;
        this.height = innerHeight;
        
        this.camera.resize();
        this.renderer.resize();
    }

    update() {        
        this.camera?.update();
        this.renderer?.update();
        this.scene?.update();
    }

    destroyScene() {
        this.scene.traverse((child: any) => {
            if (child instanceof Mesh) {
                child.geometry.dispose();
                for (const key in child.material) {
                    const value = child.material[key];
                    if (value && typeof value.dispose === 'function') value.dispose();
                }
            }
        });
    }

    destroy() {        
        removeEventListener('resize', this.resizeHandler);
        this.time.stop();

        // Traverse the whole scene
        this.destroyScene();

        this.camera.controls.dispose();
        this.renderer.instance.dispose();

        if (this.debug?.active) this.debug.ui.destroy();

        instance = null;
    }
}