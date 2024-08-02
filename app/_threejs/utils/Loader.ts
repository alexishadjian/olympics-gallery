import { SRGBColorSpace, TextureLoader } from "three";
import Experience from "../Experience";

export default class Loader {
    
    sources: any;
    textureLoader!: TextureLoader;
    items: any;
    toLoad: number;
    loaded: number;
    experience: Experience;

    constructor() {
        this.experience = new Experience();
        this.sources = []; // Put files source here
        
        this.items = {};
        this.toLoad = this.sources.length;
        this.loaded = 0;

        if (this.sources.length > 0) {
            this.setLoaders();
            this.startLoading();
        } else {
            this.experience.onResourcesLoaded();
        }
    }

    setLoaders() {
        this.textureLoader = new TextureLoader();
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
}