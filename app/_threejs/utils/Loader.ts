import { LoadingManager, SRGBColorSpace, TextureLoader, Scene } from "three";
import Experience from "@/threejs/Experience";
import images from "@/threejs/source";

export default class Loader {
    
    sources: any[];
    textureLoader!: TextureLoader;
    items: any[];
    toLoad: number;
    loaded: number;
    experience: Experience;
    loadingManager!: LoadingManager;
    scene: Scene;
    overlay: HTMLElement;
    loadBar: HTMLElement;
    overlayContent: HTMLElement;

    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.sources = images;
        
        this.items = [];
        this.toLoad = this.sources.length;
        this.loaded = 0;

        this.overlay = document.querySelector('.overlay') as HTMLElement;
        this.overlayContent = this.overlay.querySelector('.content') as HTMLElement;
        this.loadBar = this.overlay.querySelector('.loading-bar .indicator') as HTMLElement;


        if (this.sources.length > 0) {
            this.setLoaders();
            this.startLoading();
        } else {
            this.experience.onResourcesLoaded();
        }
    }

    setLoaders() {
        this.loadingManager = new LoadingManager(
            () => {
                //Loaded
                setTimeout(() => {    
                    this.overlayContent.style.opacity = '0';
                    this.overlay.style.opacity = '0';
                    this.overlay.style.visibility = 'hidden';
                    this.experience.scene.gallery.autoScroll = false;
                }, 3000);
            },
            (itemUrl, itemLoaded, itemTotal) => {
                //Progress
                const ratio = itemLoaded / itemTotal;
                this.loadBar.style.transform = `scaleX(${ratio})`
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
        // file.colorSpace = SRGBColorSpace;
        // file.generateMipmaps = false;
        this.items[source.name] = file;

        this.loaded++;

        if (this.loaded === this.toLoad) {
            this.experience.onResourcesLoaded();
        }
    }

}