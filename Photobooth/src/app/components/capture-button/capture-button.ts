import { Component, inject } from '@angular/core';
import { PhotoboothService } from '../../services/photobooth-service';


@Component({
  selector: 'app-capture-button',
  imports: [],
  templateUrl: './capture-button.html',
  styleUrl: './capture-button.css',
})
export class CaptureButton {
  private photoboothService = inject(PhotoboothService);
  onClick(){
    
    this.photoboothService.startPhotobooth();
  }
}
