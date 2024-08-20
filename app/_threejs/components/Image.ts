import { BufferGeometry, Mesh, PlaneGeometry, ShaderMaterial, Vector2, Vector3 } from "three";
import Experience from "@/threejs/Experience";
import fragment from "@/threejs/shaders/fragment.glsl";
import vertex from "@/threejs/shaders/vertex.glsl";

export default class Image {

    experience: Experience;
    geometry!: PlaneGeometry;
    material!: ShaderMaterial;
    mesh!: Mesh;
    width: number;
    height: number;
    texture: string;
    time: any;
    loader: any;
    targetY: number = 0;
    currentY: number = 0;
    initialPositions!: Vector3;


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
        this.geometry = new PlaneGeometry(this.width, this.height, 32, 32);
    }

    setMaterial() {
        this.material = new ShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment,
            uniforms: {
                uFrequency: { value: new Vector2(5, 5) },
                uTime: { value: 0 },
                uTexture: { value: this.loader.items[this.texture] },
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