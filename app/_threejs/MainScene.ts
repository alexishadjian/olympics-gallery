import { AxesHelper, Scene } from 'three';
import Image from '@/threejs/components/Image';
import Gallery from '@/threejs/components/Gallery';
import Experience from '@/threejs/Experience';


export default class MainScene extends Scene {

    axesHelper!: AxesHelper;
    image!: Image;
    gallery!: Gallery;
    debug: any;
    debugFolder: any;
    experience: Experience;

    constructor() {

        super();
        this.experience = new Experience();
        this.debug = this.experience.debug;

        
        if (this.debug?.active) {
            // Debug group
            this.debugFolder = this.debug.ui.addFolder('Gallery');

            // Debug property
            this.debugFolder.add(this.gallery.position, 'x').min(-100).max(100).step(2).name('Gal pos x');
            this.debugFolder.add(this.gallery.position, 'y').min(-100).max(100).step(2).name('Gal pos y');
            this.debugFolder.add(this.gallery.position, 'z').min(-100).max(100).step(2).name('Gal pos z');

            this.debugFolder.add(this.gallery.rotation, 'x').min(-10).max(10).step(0.1).name('Gal rot x');
            this.debugFolder.add(this.gallery.rotation, 'y').min(-10).max(10).step(0.1).name('Gal rot y');
            this.debugFolder.add(this.gallery.rotation, 'z').min(-10).max(10).step(0.1).name('Gal rot z');
        }
    }


    buildScene() {
        // this.axesHelper = new AxesHelper(5);
        // this.axesHelper.position.y = 0.5;
        // this.add(this.axesHelper);

        this.gallery = new Gallery();
        // this.gallery.position.z = -20;
        this.add(this.gallery);
    }

    update() {
        this.gallery?.update();
    }
}