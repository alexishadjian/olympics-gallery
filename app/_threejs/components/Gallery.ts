import { Mesh, MeshBasicMaterial, Object3D, PlaneGeometry, Raycaster, Vector2 } from "three";
import Experience from "../Experience";
import Image from "./Image";

export default class Gallery extends Object3D {
    
    experience: Experience;
    time: any;
    loader: any;
    images: { name: string }[] = [];
    scroll: number = 0;
    scrollTarget: number = 0;
    currentScroll: number = 0;
    imageObjects: any = [];
    touchStartY: number | null = null;
    autoScroll: boolean = true;
    // raycaster: Raycaster;
    // mouse: Vector2;
    // hoveredImages: Set<Image>;


    constructor() {

        super();

        this.experience = new Experience;
        this.time = this.experience.time;
        this.loader = this.experience.loader;

        // Get images sources
        this.images = this.loader?.sources;


        // this.raycaster = new Raycaster();
        // this.mouse = new Vector2();
        // this.hoveredImages = new Set();


        this.setImage();
        this.scrollEvent();
        this.touchEvent();
        // this.hoverEvent();

    }
    
    setImage() {
        this.images?.forEach((img, i) => {
            const image = new Image(2, 1.5, img.name);            
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
        this.currentScroll += this.scroll * 0.3;
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

    /***** Hover handle *****/

    // hoverEvent() {
    //     window.addEventListener('mousemove', this.onMouseMove.bind(this));
    // }

    // onMouseMove(event: MouseEvent) {
    //     this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    //     this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    // }

    update() {
        this.updateScrollValues();

        if (this.autoScroll) this.scrollTarget += 0.04;
    
        // const waveFrequency = 0.2; // Frequency
        const waveWidth = 1.7; // Wave area width
        const waveAmplitude = 1.4; // Wave height
        const totalHeight = this.images?.length * 1;
    
        this.imageObjects.forEach((image: Image, i: number) => {

            image.update();

            let imagePositionZ = (i * -1 + this.currentScroll) % totalHeight;
    
            // Infinite effect : move image when out of screen to comeback
            if (imagePositionZ < -totalHeight / 2) {
                imagePositionZ += totalHeight;
            } else if (imagePositionZ > totalHeight / 2) {
                imagePositionZ -= totalHeight;
            }
    
            image.mesh.position.z = imagePositionZ;
    
            // Apply wave effect only on image near center 
            image.targetY = waveAmplitude * Math.exp(-Math.pow(imagePositionZ / waveWidth, 2));
            // image.targetY = waveAmplitude * Math.sin(imagePositionZ * waveFrequency);


            // Smooth transition
            image.currentY += (image.targetY - image.currentY) * 0.1;
            image.mesh.position.y = image.currentY;
        });
    }
    
}