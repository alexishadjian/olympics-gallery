import { Mesh, MeshBasicMaterial, PlaneGeometry } from "three";
import Experience from "../Experience";

export default class Image {

    experience: Experience;
    geometry!: PlaneGeometry;
    material!: MeshBasicMaterial;
    mesh!: Mesh;
    width: number;
    height: number;
    texture: string;
    time: any;
    loader: any;

    constructor(width: number, height: number, texture: string) {

        this.experience = new Experience;
        this.time = this.experience.time;
        this.loader = this.experience.loader;

        this.width = width;
        this.height = height;
        this.texture = texture;

        this.setGeometry();
        this.setMaterial();
        this.setMesh();
    }

    setGeometry() {
        this.geometry = new PlaneGeometry(this.width, this.height, 64, 64);
    }

    setMaterial() {
        this.material = new MeshBasicMaterial({
            map: this.loader.items[this.texture],
        });
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