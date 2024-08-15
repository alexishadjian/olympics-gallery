import { Mesh, MeshBasicMaterial, Object3D, PlaneGeometry, Raycaster, Vector2, Vector3 } from "three";
import Experience from "../Experience";
import Image from "./Image";
import gsap from 'gsap';


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
    raycaster: Raycaster;
    mouse: Vector2;
    selectedImage?: Image;
    debug: any;
    debugFolder: any;


    constructor() {

        super();

        this.experience = new Experience();
        this.time = this.experience.time;
        this.loader = this.experience.loader;
        this.debug = this.experience.debug;

        // Get images sources
        this.images = this.loader?.sources;


        this.raycaster = new Raycaster();
        this.mouse = new Vector2();

        this.selectedImage = undefined;

        this.setImage();
        this.scrollEvent();
        this.touchEvent();
        this.hoverEvent();
        this.setupClickEvent();


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

    hoverEvent() {
        window.addEventListener('mousemove', this.onMouseMove.bind(this), {passive: true});
    }

    onMouseMove(event: MouseEvent) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    /***** Click handle *****/

    setupClickEvent() {
        window.addEventListener('click', this.onClick.bind(this), { passive: true });
    }


    onClick(event: MouseEvent) {

        // if (this.selectedImage) {
        //     this.closeFullScreen(this.selectedImage);
        // } else {

        //     this.raycaster.setFromCamera(this.mouse, this.experience.camera.instance);
        //     const intersects = this.raycaster.intersectObjects(this.imageObjects.map((img: Image) => img.mesh));
        
        //     if (intersects.length > 0) {
        //         const intersectedMesh = intersects[0].object as Mesh;
        //         const selectedImage = this.imageObjects.find((img: Image) => img.mesh === intersectedMesh) || null;
        
        //         if (selectedImage) {
        //             this.enterFullScreen(selectedImage);
        //         }
        //     }
        // }
    }

    enterFullScreen(selectedImage: Image) {
        // const camera = this.experience.camera.instance;
        // const aspect = this.experience.width / this.experience.height;

        // // selectedImage.mesh.lookAt(camera.position); // S'assure que l'image fait face à la caméra

    
        // // Calcule la position cible en utilisant la position de la caméra
        // const targetPosition = new Vector3(
        //     camera.position.x,
        //     camera.position.y,
        //     camera.position.z - 1 // Ajustez si nécessaire
        // );

        // gsap.to(selectedImage.mesh.position, {
        //     x: targetPosition.x,
        //     y: targetPosition.y,
        //     z: targetPosition.z,
        //     duration: 1.5,
        //     ease: "power2.inOut"
        // });

        // gsap.to(selectedImage.mesh.scale, {
        //     x: selectedImage.initialScale.x * 2,
        //     y: selectedImage.initialScale.y * 2,
        //     duration: 1.5,
        //     ease: "power2.inOut"
        // });

        // gsap.to(selectedImage.material.uniforms.uProgress, {
        //     value: 1.0,
        //     duration: 1.5,
        //     ease: "power2.inOut"
        // });

        // this.selectedImage = selectedImage;
    }


    // closeFullScreen(selectedImage: Image) {
    //     gsap.to(selectedImage.mesh.position, {
    //         z: selectedImage.initialZPosition,
    //         duration: 1.5,
    //         ease: "power2.inOut"
    //     });

    //     gsap.to(selectedImage.mesh.scale, {
    //         x: selectedImage.initialScale.x,
    //         y: selectedImage.initialScale.y,
    //         duration: 1.5,
    //         ease: "power2.inOut"
    //     });

    //     gsap.to(selectedImage.material.uniforms.uProgress, {
    //         value: 0.0,
    //         duration: 1.5,
    //         ease: "power2.inOut"
    //     });

    //     this.selectedImage = undefined;
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