import { Injectable, NgZone, OnDestroy } from '@angular/core';
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

@Injectable({
  providedIn: 'root'
})
export class ThreeService implements OnDestroy {

  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private loader = new GLTFLoader();
  private frameId: number | null = null;

  private canvas!: HTMLCanvasElement;

  constructor(private ngZone: NgZone) {
    GSAP.gsap.registerPlugin(ScrollTrigger);
  }

  public init(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.5;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();
    this.scene.background = null;

    // Adjusted camera settings
    this.camera = new THREE.PerspectiveCamera(
      45, // Reduced FOV for less distortion
      window.innerWidth / window.innerHeight,
      0.1,
      10000 // Increased far plane
    );
    this.camera.position.z = 500; // Adjusted camera distance
    this.camera.position.y = 100;
    this.camera.lookAt(0, 0, 0);

    // Adjusted lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    this.scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 2);
    pointLight1.position.set(200, 200, 200);
    this.scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 2);
    pointLight2.position.set(-200, -200, -200);
    this.scene.add(pointLight2);

    this.loadModel(); // Call loadModel without passing data, as the path is hardcoded
    this.animate();
    this.gsapAnimations();

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  private loadModel(): void {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/assets/models/draco/gltf/');
    this.loader.setDRACOLoader(dracoLoader);

    this.loader.load(
      'assets/models/black_hole_gltf/scene.gltf',
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.1, 0.1, 0.1);
        model.name = "blackhole";

        // Center the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const material = child.material as THREE.Material; // Type cast to THREE.Material

            // Force materials to be transparent where needed
            if (['black_hole_center', 'black_hole_distortion', 'black_hole_blackoutside'].includes(material.name)) {
              material.transparent = true;
            }

            // Specific material handling based on GLTF file
            switch (material.name) {
              case 'black_hole_center':
                (material as THREE.MeshStandardMaterial).opacity = 0.888;
                (material as THREE.MeshStandardMaterial).color.setRGB(0, 0, 0);
                material.transparent = true;
                break;

              case 'black_hole_distortion':
                (material as THREE.MeshStandardMaterial).opacity = 0.25;
                (material as THREE.MeshStandardMaterial).color.setRGB(0, 0, 0);
                material.transparent = true;
                break;

              case 'black_hole_blackoutside':
                material.transparent = true;
                (material as THREE.MeshStandardMaterial).opacity = 1.0;
                (material as THREE.MeshStandardMaterial).color.setRGB(0, 0, 0);
                // Enable transmission
                //(material as THREE.MeshStandardMaterial).transmission = 1.0;
                break;

              case 'black_hole_light1':
                (material as THREE.MeshStandardMaterial).emissive.setRGB(1.0, 1.0, 1.0);
                (material as THREE.MeshStandardMaterial).emissiveIntensity = 2.0;
                break;

              case 'black_hole_light2':
                (material as THREE.MeshStandardMaterial).emissive.setRGB(0.6, 0.6, 0.6);
                (material as THREE.MeshStandardMaterial).emissiveIntensity = 1.0;
                break;

              case 'black_hole_light3':
                (material as THREE.MeshStandardMaterial).emissive.setRGB(0.2, 0.2, 0.2);
                (material as THREE.MeshStandardMaterial).emissiveIntensity = 0.5;
                break;
            }

            // Enable alpha blending for transparent materials
            if (material.transparent) {
              material.blending = THREE.NormalBlending;
              material.depthWrite = false;
            }

            // Force all textures to update
            for (const key in material) {
              const value = (material as any)[key];
              if (value && value.isTexture) {
                value.needsUpdate = true;
              }
            }

            material.needsUpdate = true;
          }
        });

        this.scene.add(model);

        // Log materials for debugging
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            console.log('Material:', child.material.name, child.material);
          }
        });
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
      },
      (error) => {
        console.error('An error happened', error);
      }
    );
  }

  private animate = () => {
    this.frameId = requestAnimationFrame(this.animate);

    const model = this.scene.getObjectByName('blackhole');
    if (model) {
      model.rotation.z += 0.001; // Adjusted rotation axis and speed
    }

    this.renderer.render(this.scene, this.camera);
  };

  private gsapAnimations(): void {
    GSAP.gsap.to(this.camera.position, {
      z: 2,
      duration: 2,
      scrollTrigger: {
        trigger: this.canvas,
        start: innerHeight * 10.2,
        end: innerHeight * 10.4,
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
    this.renderer.dispose();
  }
}
