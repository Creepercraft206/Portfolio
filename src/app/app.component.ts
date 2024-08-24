import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Scene } from "three";
import {CanvasComponent} from "./canvas/canvas.component";
import {ContentComponent} from "./content/content.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CanvasComponent, ContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'portfolio';

  ngOnInit() {
    /*
    const loader = new GLTFLoader();

    loader.load('https://localhost:4200/public/blackhole.glb', function(gltf) {
      // create a scene
      const scene = new Scene();
      scene.add(gltf.scene);
    },undefined, function (error) {
      console.error(error);
    });
    */
  }
}
