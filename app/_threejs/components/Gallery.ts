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
    fullScreen: boolean = false;
    scrollable: boolean = true;


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
            const image = new Image(2, 1.4, img.name);            
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
        if (this.scrollable) {
            const delta = event.deltaY * 0.001;
            this.scrollTarget += delta;
            if (this.fullScreen && this.selectedImage) this.closeFullScreen(this.selectedImage);
        }
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
        // this.closeFullScreen(this.selectedImage);            

        if (!this.fullScreen) {
            this.raycaster.setFromCamera(this.mouse, this.experience.camera.instance);
            const intersects = this.raycaster.intersectObjects(this.imageObjects.map((img: Image) => img.mesh));
        
            if (intersects.length > 0) {
                const intersectedMesh = intersects[0].object as Mesh;
                const selectedImage = this.imageObjects.find((img: Image) => img.mesh === intersectedMesh) || null;
        
                if (selectedImage) {
                    this.enterFullScreen(selectedImage);
                }
            }
        } 
        // if (this.fullScreen && this.selectedImage) {
        //     this.closeFullScreen(this.selectedImage);
        // }
    }

    enterFullScreen(selectedImage: Image) {
        this.scrollable = false;

        selectedImage.initialPositions = selectedImage.mesh.position.clone();

        // Move before and after images out
        this.moveOutImages(selectedImage);

        // Calculate scale based on available width
        const availableWidth = (this.experience.camera.instance.right - this.experience.camera.instance.left) * 0.8; // 90% of the camera's width
        const newScale = availableWidth / selectedImage.mesh.geometry.parameters.width;

        // Scale up Image
        gsap.to(selectedImage.mesh.scale, {
            x: newScale,
            y: newScale,
            duration: 1.5,
            ease: "power2.inOut"
        });

        // Center image
        gsap.to(selectedImage.mesh.position, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1.5,
            ease: "power2.inOut"
        });

        // Rotate image
        gsap.to(selectedImage.mesh.rotation, {
            y: 0.5,
            duration: 1.5,
            ease: "power2.inOut"
        });
        
        this.selectedImage = selectedImage;
        this.fullScreen = true;

        setTimeout(() => {
            this.scrollable = true;
        }, 1500);
    }


    closeFullScreen(selectedImage: Image) {

        gsap.to(selectedImage.mesh.scale, {
            x: 1,
            y: 1,
            duration: 1.5,
            ease: "power2.inOut"
        });

        // Center image
        gsap.to(selectedImage.mesh.position, {
            x: 0,
            y: selectedImage.initialPositions.y,
            z: selectedImage.initialPositions.z,
            duration: 1.5,
            ease: "power2.inOut"
        });

        gsap.to(selectedImage.mesh.rotation, {
            y: 0,
            duration: 1.5,
            ease: "power2.inOut"
        });

        // Bring before and after images back
        this.moveOutImages(selectedImage);

        this.selectedImage = undefined;
        setTimeout(() => {
            this.fullScreen = false;
        }, 1500);
    }

    moveOutImages(selectedImage: Image) {
        // Calculate the distance sufficient to get the images out of the screen
        const offsetDistance = (this.experience.camera.instance.right - this.experience.camera.instance.left) * 2;
    
        this.imageObjects.forEach((image: Image) => {
            const isBeforeSelected = image.mesh.position.z < selectedImage.mesh.position.z;

            const direction = isBeforeSelected ? -1 : 1;
            const moveDistance = this.fullScreen ? -direction * offsetDistance : direction * offsetDistance;

            if (image.mesh.position.z !== selectedImage.mesh.position.z) {
                gsap.to(image.mesh.position, {
                    z: image.mesh.position.z + moveDistance,
                    duration: 1.5,
                    ease: "power2.inOut"
                });
            }
        });
    }
    

    update() {
        if (!this.fullScreen) this.updateScrollValues();

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
    
            if (!this.fullScreen) image.mesh.position.z = imagePositionZ;
    
            // Apply wave effect only on image near center 
            image.targetY = waveAmplitude * Math.exp(-Math.pow(imagePositionZ / waveWidth, 2));
            // image.targetY = waveAmplitude * Math.sin(imagePositionZ * waveFrequency);


            // Smooth transition
            image.currentY += (image.targetY - image.currentY) * 0.1;
            if (!this.fullScreen) image.mesh.position.y = image.currentY;
        });
    } 
}