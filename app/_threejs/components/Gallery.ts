import { Mesh, MeshBasicMaterial, Object3D, PlaneGeometry } from "three";
import Experience from "../Experience";
import Image from "./Image";

export default class Gallery extends Object3D {
    
    experience: Experience;
    time: any;
    loader: any;
    images!: { name: string }[];


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
        
        this.setImage();
    }
    
    setImage() {
        this.images.forEach((img, i) => {
            const image = new Image(6, 6, img.name);            
            image.mesh.position.z = i * 3.5;
            this.add(image.mesh);
        });
    }

    update() {
        // this.mesh.rotation.y = 0.5 * this.time.elapsedTime
        // this.mesh.rotation.x = 0.5 * this.time.elapsedTime
    }
}