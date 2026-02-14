import { Component, signal, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Timer } from './components/timer/timer';
import { Camera } from './components/camera/camera';
import { CaptureButton } from './components/capture-button/capture-button';
import { Layout } from './components/layout/layout';
import { PhotoboothService } from './services/photobooth-service';
import { FinalStrip } from './components/final-strip/final-strip';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Timer, Camera, CaptureButton, Layout, FinalStrip],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isFinished = false;
  public photoboothService = inject(PhotoboothService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.photoboothService.sessionFinished$.subscribe(() => {
      this.isFinished = true;
      this.cdr.detectChanges();
    });
  }
}
