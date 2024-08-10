import { LoadingManager, SRGBColorSpace, TextureLoader, Scene, PlaneGeometry, ShaderMaterial, Mesh } from "three";
import Experience from "../Experience";
import images from "../source";

export default class Loader {
    
    sources: any;
    textureLoader!: TextureLoader;
    items: any;
    toLoad: number;
    loaded: number;
    experience: Experience;
    loadingManager!: LoadingManager;
    scene: Scene;
    overlay!: Mesh;
    overlayGeometry!: PlaneGeometry;
    overlayMaterial!: ShaderMaterial;
    uAlphaTarget: number;
    uAlphaCurrent: number;

    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        // Put overlay to hide scene while loading
        this.setOverlay();

        this.sources = images;
        
        this.items = {};
        this.toLoad = this.sources.length;
        this.loaded = 0;

        this.uAlphaTarget = 1.0;
        this.uAlphaCurrent = 1.0;

        if (this.sources.length > 0) {
            this.setLoaders();
            this.startLoading();
        } else {
            this.experience.onResourcesLoaded();
        }
    }

    setOverlay() {
        this.overlayGeometry = new PlaneGeometry(2, 2, 1, 1);
        this.overlayMaterial = new ShaderMaterial({
            // wireframe: false,
            transparent: true,
            depthTest: false,
            uniforms: {
                uAlpha: { value: this.uAlphaCurrent }
            },
            vertexShader: `
                void main() {
                    gl_Position = vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float uAlpha;
                void main() {
                    gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
                }
            `
        });
        this.overlay = new Mesh(this.overlayGeometry, this.overlayMaterial);
        // Put on top of scene
        this.overlay.renderOrder = 999;

        this.scene.add(this.overlay);
    }

    setLoaders() {
        this.loadingManager = new LoadingManager(
            () => {
                console.log('Loaded');
                this.uAlphaTarget = 0;
            },
            () => {
                console.log('Progress');
            }
        );
        this.textureLoader = new TextureLoader(this.loadingManager);
    }

    startLoading() {
        if (this.sources.length > 0) {
            for (const source of this.sources) {
                if (source.type === 'texture') {
                    this.textureLoader.load(source.path, (file) => {
                        this.sourceLoaded(source, file);                      
                    });
                }
            }
        }
    }

    sourceLoaded(source: any, file: any) {
        file.colorSpace = SRGBColorSpace;
        this.items[source.name] = file;

        this.loaded++;

        if (this.loaded === this.toLoad) {
            this.experience.onResourcesLoaded();
        }
    }

    update() {
        // Interpolate the uAlpha value towards the target
        this.uAlphaCurrent += (this.uAlphaTarget - this.uAlphaCurrent) * 0.15;

        // Update the shader uniform with the new alpha value
        this.overlayMaterial.uniforms.uAlpha.value = this.uAlphaCurrent;

        // Optionally, remove the overlay from the scene once it's fully faded out
        if (this.uAlphaCurrent < 0.01 && this.overlayMaterial.uniforms.uAlpha.value === 0) {
            this.scene.remove(this.overlay);
        }
    }
}