import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { PhotoboothService } from '../../services/photobooth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  private photoboothService = inject(PhotoboothService);
  private cdr = inject(ChangeDetectorRef);
  
  capturedImages: string[] = [];

  ngOnInit() {
    this.photoboothService.newImageAdded$.subscribe((img) => {
      setTimeout(() => {
        if (img && this.capturedImages.length < 4) {
          this.capturedImages.push(img);
          this.cdr.detectChanges();
        }
      }, 0);
    });
  }
}
