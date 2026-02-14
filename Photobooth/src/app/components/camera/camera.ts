import { AfterViewInit, Component, ViewChild, ElementRef, inject, DestroyRef, ChangeDetectorRef } from '@angular/core';
import { PhotoboothService } from '../../services/photobooth-service';

@Component({
  selector: 'app-camera',
  imports: [],
  templateUrl: './camera.html',
  styleUrl: './camera.css',
})
export class Camera implements AfterViewInit {

  private photoboothService = inject(PhotoboothService);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('video') videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  isFlashing = false;

  constructor(){}

  ngAfterViewInit(): void {
    this.startCamera();
    const sub = this.photoboothService.takePhotoRequested$.subscribe(() => {
      this.captureImage();
    });

    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }

  startCamera(){
    navigator.mediaDevices.getUserMedia({
      video: { 
      width: { ideal: 1280 },
      height: { ideal: 720 },
      facingMode: "user" 
    },
    audio: false
    }).then(stream=>{
      this.videoRef.nativeElement.srcObject = stream;
    })
  }

  captureImage() {

    let imageData: string | null = null;

    setTimeout(() => {

    this.isFlashing = true;
    this.cdr.detectChanges()

    const video = this.videoRef.nativeElement;
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');

    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.translate(canvas.width, 0);
      context.scale(-1, 1);
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      console.log("Captured!");
      imageData = canvas.toDataURL('image/png');
      this.photoboothService.addCapturedImage(imageData);
      
    }

    setTimeout(() => {
    this.isFlashing = false;
    this.cdr.detectChanges();
    }, 300);
  }, 0);
  }

}
