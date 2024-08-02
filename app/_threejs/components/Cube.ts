import { Mesh, MeshBasicMaterial, BoxGeometry } from "three";
import Experience from "../Experience";

export default class Cube {
    
    experience: Experience;
    geometry!: BoxGeometry;
    material!: MeshBasicMaterial;
    mesh!: Mesh;
    width: number;
    height: number;
    depth: number;
    time: any

    constructor(width: number, height: number, depth: number) {

        this.experience = new Experience;
        this.time = this.experience.time;


        this.width = width;
        this.height = height;
        this.depth = depth;
        
        this.setGeometry();
        this.setMaterial();
        this.setMesh();
    }
    
    setGeometry() {
        this.geometry = new BoxGeometry(this.width, this.height, this.depth);
    }

    setMaterial() {
        this.material = new MeshBasicMaterial({ color: 0x006de1 });
    }

    setMesh() {
        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh.position.set(0, 0, 0);
    }

    update() {
        this.mesh.rotation.y = 0.5 * this.time.elapsedTime
        this.mesh.rotation.x = 0.5 * this.time.elapsedTime
    }
}