import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoboothService } from '../../services/photobooth-service';

@Component({
  selector: 'app-final-strip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './final-strip.html',
  styleUrl: './final-strip.css'
})
export class FinalStrip {
  public service = inject(PhotoboothService);

  async downloadImage() {
    const images = this.service.capturedImages;
    if (images.length === 0) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const firstImg = await this.loadImage(images[0]);
    const w = firstImg.width;
    const h = firstImg.height;
    
    const margin = 50; 
    canvas.width = w + (margin * 2);
    canvas.height = (h * 4) + (margin * 5);

    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < images.length; i++) {
        const img = await this.loadImage(images[i]);
        const yPos = margin + (i * (h + margin));
        ctx.drawImage(img, margin, yPos, w, h);
      }

      const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
      const link = document.createElement('a');
      link.download = `booth-memory-${Date.now()}.jpg`;
      link.href = dataUrl;
      link.click();
    }
  }

  private loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = src;
    });
  }

  restart() {
    window.location.reload(); 
  }
}