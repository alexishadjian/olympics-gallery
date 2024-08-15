import { Mesh, BufferGeometry, PlaneGeometry, ShaderMaterial, RawShaderMaterial, Vector2 } from "three";
import Experience from "../Experience";
import fragment from "@/threejs/shaders/fragment.glsl";
import vertex from "@/threejs/shaders/vertex.glsl";

export default class Image {

    experience: Experience;
    geometry!: BufferGeometry;
    material!: ShaderMaterial;
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
        const planeGeometry = new PlaneGeometry(this.width, this.height, 32, 32);
        this.geometry = planeGeometry as BufferGeometry;

        // Initial position
        const positionAttribute = this.geometry.attributes.position;
        const positions = positionAttribute.array as Float32Array;
        this.initialPositions = new Float32Array(positions.length);
        this.initialPositions.set(positions);

    }

    setMaterial() {
        this.material = new RawShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment,
            uniforms: {
                uFrequency: { value: new Vector2(5, 5) },
                uTime: { value: 0 },
                uTexture: { value: this.loader.items[this.texture] }
            }
        });
    }

    setMesh() {
        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh.position.set(0, 0, 0);
    }

    update() {
        this.material.uniforms.uTime.value = this.time.elapsedTime;
    }
}