    import { Mesh, MeshBasicMaterial, OrthographicCamera, Scene, SphereGeometry } from "three";
    import { OrbitControls } from "three/examples/jsm/Addons.js";
    import Experience from "@/threejs/Experience";


    export default class Camera {

        experience: Experience;
        instance!: OrthographicCamera;
        scene: Scene;
        canvas?: HTMLElement;
        controls!: OrbitControls;
        cameraTarget!: Mesh;
        debug: any;
        debugFolder: any;
        distance!: number;

        
        constructor() {
            
            this.experience = new Experience();
            this.scene = this.experience.scene;
            this.canvas = this.experience.canvas;
            this.debug = this.experience.debug;

            this.setCameraDistance();


            this.setInstance();
            this.setCameraTarget();
            // this.setOrbitControls();

            if(this.debug.active) {
                // Debug group
                this.debugFolder = this.debug.ui.addFolder('Camera');

                this.debugFolder.add(this.instance.position, 'x').min(-100).max(100).step(1).name('Camera x');
                this.debugFolder.add(this.instance.position, 'y').min(-100).max(100).step(1).name('Camera y');
                this.debugFolder.add(this.instance.position, 'z').min(-100).max(100).step(1).name('Camera z');

                // Debug property
                this.debugFolder.add(this.cameraTarget.position, 'x').min(-100).max(100).step(2).name('Target x');
                this.debugFolder.add(this.cameraTarget.position, 'y').min(-100).max(100).step(2).name('Target y');
                this.debugFolder.add(this.cameraTarget.position, 'z').min(-100).max(100).step(2).name('Target z');
            }

        }

        setInstance() {
            const aspect = this.experience.width / this.experience.height;
            this.instance = new OrthographicCamera(
                -this.distance * aspect,
                this.distance * aspect,
                this.distance,
                -this.distance,
                0.1,
                1000
            );
    
            this.instance.position.set(12, 14, 22);
            this.scene.add(this.instance);
        }

        setCameraTarget() {
            this.cameraTarget = new Mesh(
                new SphereGeometry(0, 4, 4),
                new MeshBasicMaterial({ color: 'blue', wireframe: true })
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

        setCameraDistance() {
            const minWidth = 300;  // Minimum screen width for maximum distance (4)
            const maxWidth = 800;  // Maximum screen width for minimum distance (2)
            const maxDistance = 4; // Maximum distance (when the screen width is small)
            const minDistance = 2; // Minimum distance (when the screen width is large)
            
            // Calculate the distance based on the screen width, clamped between 2 and 4
            const clampedScreenWidth = Math.max(minWidth, Math.min(maxWidth, innerWidth));
            const normalizedWidth = (clampedScreenWidth - minWidth) / (maxWidth - minWidth);
            
            this.distance = maxDistance - normalizedWidth * (maxDistance - minDistance);
        }

        resize() {
            this.setCameraDistance();
            
            const aspect = this.experience.width / this.experience.height;
            this.instance.left = -this.distance * aspect;
            this.instance.right = this.distance * aspect;   
            this.instance.top = this.distance;
            this.instance.bottom = -this.distance;
            this.instance.updateProjectionMatrix();
        }

        update() {
            // this.controls.update();
            // this.instance.lookAt(this.cameraTarget.position);
        }

    }