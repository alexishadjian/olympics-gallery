import { Mesh, BufferGeometry, PlaneGeometry, ShaderMaterial, RawShaderMaterial, Vector2, Vector3 } from "three";
import Experience from "../Experience";
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

        // this.material.uniforms.uOriginalPosition.value = new Vector2(this.mesh.position.x, this.mesh.position.y);
    }

    setGeometry() {
        const planeGeometry = new PlaneGeometry(this.width, this.height, 32, 32);
        this.geometry = planeGeometry;

        // Initial position
        // const positionAttribute = this.geometry.attributes.position;
        // const positions = positionAttribute.array as Float32Array;
        // this.initialPositions = new Float32Array(positions.length);
        // this.initialPositions.set(positions);

    }

    setMaterial() {
        this.material = new ShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment,
            uniforms: {
                uFrequency: { value: new Vector2(5, 5) },
                uTime: { value: 0 },
                uTexture: { value: this.loader.items[this.texture] },

                uProgress: { value: 1 },
                uMeshScale: { value: new Vector2(1, 1) },
                uMeshPosition: { value: new Vector2(2, 2) },
                uFullScreen: { value: false },

                uOriginalPosition: { value: new Vector2(0, 0) }, // Set to mesh's current position
                uTargetPosition: { value: new Vector2(0, 0) },  // Center of the screen
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