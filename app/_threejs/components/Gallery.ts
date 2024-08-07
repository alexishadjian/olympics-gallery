import { Mesh, MeshBasicMaterial, Object3D, PlaneGeometry } from "three";
import Experience from "../Experience";
import Image from "./Image";

export default class Gallery extends Object3D {
    
    experience: Experience;
    time: any;
    loader: any;
    images!: { name: string }[];
    scroll: number;
    scrollTarget: number;
    currentScroll: number;
    imageObjects: any;
    touchStartY: number | null;


    constructor() {

        super();

        this.experience = new Experience;
        this.time = this.experience.time;
        this.loader = this.experience.loader;

        this.images = [
            { name: 'beach'},
            { name: 'jungle'},
            { name: 'beach'},
            { name: 'jungle'},
            { name: 'beach'},
            { name: 'jungle'},
            { name: 'beach'},
            { name: 'jungle'},
            { name: 'beach'},
            { name: 'jungle'},
            { name: 'beach'},
            { name: 'jungle'},
        ];

        this.imageObjects = [];  
        this.scroll = 0;
        this.scrollTarget = 0;
        this.currentScroll = 0;
        this.touchStartY = null;

        
        this.setImage();
        this.scrollEvent();
        this.touchEvent();

    }
    
    setImage() {
        this.images.forEach((img, i) => {
            const image = new Image(6, 6, img.name);            
            image.mesh.position.z = i * 3.5;
            this.add(image.mesh);
            this.imageObjects.push(image);
        });
    }

    /**** Desktop scroll handle *****/

    scrollEvent() {
        window.addEventListener('wheel', this.onScroll.bind(this), { passive: true });
    }

    onScroll(event: WheelEvent) {
        const delta = event.deltaY * 0.001;
        this.scrollTarget += delta;
    }

    updateScrollValues() {
        this.scroll += (this.scrollTarget - this.scroll) * 0.1;
        // this.scroll *= 1; // adjust speed
        this.scrollTarget *= 0.9;
        this.currentScroll += this.scroll * 0.8;
    }

    /***** Mobile scroll handle *****/


    touchEvent() {
        window.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: true });
        window.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: true });
        window.addEventListener('touchend', this.onTouchEnd.bind(this), { passive: true });
    }

    onTouchStart(event: TouchEvent) {
        this.touchStartY = event.touches[0].clientY;
    }

    onTouchMove(event: TouchEvent) {
        if (this.touchStartY !== null) {
            const touchY = event.touches[0].clientY;
            const delta = (this.touchStartY - touchY) * 0.01;
            this.scrollTarget += delta;
            this.touchStartY = touchY;
        }
    }

    onTouchEnd() {
        this.touchStartY = null;
    }

    update() {

        this.updateScrollValues();

        this.imageObjects.forEach((image: Image, i: number) => {
            image.mesh.position.z = (i * -3.5 + this.currentScroll) % (this.images.length * -3.5);
        });
    }
}