import { Component, signal, DestroyRef, inject, OnInit } from '@angular/core';
import { PhotoboothService } from '../../services/photobooth-service';

@Component({
  selector: 'app-timer',
  imports: [],
  templateUrl: './timer.html',
  styleUrl: './timer.css',
})
export class Timer implements OnInit {
  private photoboothService = inject(PhotoboothService);
  private destroyRef = inject(DestroyRef);

  readonly total=4;
  readonly secondsRemaining=signal(this.total);
  private timerId: any;

  ngOnInit() {
    const sub = this.photoboothService.startTimerRequested$.subscribe(() => {
      this.startTimer();
    });

    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }

  startTimer(){
    this.secondsRemaining.set(this.total);

    this.timerId=setInterval(()=>{
      this.secondsRemaining.update(v=>v-1);

    if (this.secondsRemaining() === 0) {
      this.stopAndReport();  
    }
    }, 1000);
    this.destroyRef.onDestroy(() => clearInterval(this.timerId));
  }

  private stopAndReport() {
    clearInterval(this.timerId);
    this.photoboothService.timerEnded();
  }

}
