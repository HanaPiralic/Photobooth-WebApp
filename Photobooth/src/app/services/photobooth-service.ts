import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhotoboothService {

  private startTimerSource = new Subject<void>();
  private takePhotoSource = new Subject<void>();
  private newImageSource = new Subject<string>();
  private sessionFinishedSource = new Subject<void>();
  
  sessionFinished$ = this.sessionFinishedSource.asObservable();
  startTimerRequested$ = this.startTimerSource.asObservable();
  takePhotoRequested$ = this.takePhotoSource.asObservable();
  newImageAdded$ = this.newImageSource.asObservable();

  capturedImages: string[] = [];
  

  private imageCount = 0;

  startPhotobooth(){
    this.imageCount=4;
    this.startNewRound();
  }

  timerEnded(){
    this.takePhotoSource.next();
    this.imageCount--;

    if(this.imageCount>0){
      setTimeout(()=>this.startNewRound(),1000);
    }else {
      setTimeout(() => {
      this.sessionFinishedSource.next();
      console.log("Sve slike su spremne, prebacujem na finalni strip.");
    }, 1500);
   }
  }

  startNewRound(){
    this.startTimerSource.next();
  }

  addCapturedImage(imgData: string) {
    this.capturedImages.push(imgData);
    this.newImageSource.next(imgData);
  }
}
