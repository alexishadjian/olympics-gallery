import { Mesh, MeshBasicMaterial, BufferGeometry, Float32BufferAttribute, PlaneGeometry } from "three";
import Experience from "../Experience";

export default class Image {

    experience: Experience;
    geometry!: BufferGeometry;
    material!: MeshBasicMaterial;
    mesh!: Mesh;
    width: number;
    height: number;
    texture: string;
    time: any;
    loader: any;
    targetY: number = 0;
    currentY: number = 0;
    initialPositions!: Float32Array;


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
        const planeGeometry = new PlaneGeometry(this.width, this.height, 64, 64);
        this.geometry = planeGeometry as BufferGeometry;

        // Initial position
        const positionAttribute = this.geometry.attributes.position;
        const positions = positionAttribute.array as Float32Array;
        this.initialPositions = new Float32Array(positions.length);
        this.initialPositions.set(positions);

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
        this.applyWaveEffect();
    }

    applyWaveEffect() {
        const waveFrequency = 2; // Frequency
        const waveAmplitude = 0.05; // Amplitude

        const positionAttribute = this.geometry.attributes.position;
        const positions = positionAttribute.array as Float32Array;

        for (let i = 0; i < positions.length; i += 3) {
            const y = this.initialPositions[i + 1]; // Initial Y position
            positions[i + 2] = waveAmplitude * Math.sin(y * waveFrequency + this.time.elapsedTime); // Edit Z position
        }

        positionAttribute.needsUpdate = true;
    }
}