import {AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ThreeService} from "../three.service";
import {ContentComponent} from "../content/content.component";

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [
    ContentComponent
  ],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.css'
})
export class CanvasComponent implements OnDestroy, AfterViewInit {
  @ViewChild('canvas', { static: true })
  private canvasRef!: ElementRef<HTMLCanvasElement>;

  constructor(private threeService: ThreeService) {}

  ngAfterViewInit(): void {
    //this.threeService.init(this.canvasRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.threeService.ngOnDestroy();
  }
}
