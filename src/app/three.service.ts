import {Injectable, NgZone} from '@angular/core';
import * as THREE from "three";
import {LinearSRGBColorSpace} from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import * as GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

@Injectable({
  providedIn: 'root'
})
export class ThreeService {

  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private loader = new GLTFLoader();
  private frameId: number | null = null;

  private canvas!: HTMLCanvasElement;

  constructor(private ngZone: NgZone) {}

  public init(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.outputColorSpace = LinearSRGBColorSpace;


    this.scene = new THREE.Scene();
    const texture = new THREE.TextureLoader().load('assets/background.jpg');
    this.scene.background = texture;

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 4;
    this.camera.position.y = -0.5;

    GSAP.gsap.registerPlugin(ScrollTrigger);

    this.gsapAnimations();
    this.loadModel();
    this.createLight();
    this.animate();
  }

  private loadModel(): void {
    this.loader.load(
      'assets/models/blackhole/scene.gltf',
      (gltf) => {
        gltf.scene.rotation.x = Math.PI / -1.125;
        gltf.scene.rotation.z = Math.PI / 1.05;
        gltf.scene.name = "blackhole";
        this.scene.add(gltf.scene);
      },
      undefined,
      (error) => {
        console.error('An error happened', error);
      }
    );
  }

  private createLight(): void {
    const light = new THREE.DirectionalLight("white", 10.0);
    //light.position.set(0, 0, -5);
    light.rotation.x = Math.PI / -1.125;
    light.rotation.z = Math.PI / 1.05;
    //this.scene.add(light);
  }

  private animate = () => {
    this.frameId = requestAnimationFrame(this.animate);

    const model = this.scene.getObjectByName('blackhole');
    if (model) {
      model.rotation.y -= 0.001;
    }

    this.renderer.render(this.scene, this.camera);
  };

  private gsapAnimations(): void {

    GSAP.gsap.to(this.camera.position, {
      z: 2,
      duration: 2,
      scrollTrigger: {
        trigger: this.canvas,
        start: "top top",
        end: "bottom top",
        scrub: true
      },
      onUpdate: () => {
        this.camera.updateProjectionMatrix();
      }
    });
    GSAP.gsap.to(this.camera.rotation, {
      z: 0.5,
      duration: 2,
      scrollTrigger: {
        trigger: this.canvas,
        start: "top top",
        end: "bottom top",
        scrub: true
      },
    });
    GSAP.gsap.fromTo(this.camera.position, {
      x: 0
    }, {
      x: 1,
      duration: 5,
      scrollTrigger: {
        trigger: this.canvas,
        start: "top top",
        end: "bottom top",
        scrub: true
      },
      onUpdate: () => {
        this.camera.updateProjectionMatrix();
      }

    });
  }

  public ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }
}
