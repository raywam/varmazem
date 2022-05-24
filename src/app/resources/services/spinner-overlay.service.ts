import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerOverlayService {
  public loading = new BehaviorSubject(false);

  constructor() {
  }

  show() {
    this.loading.next(true);
  }

  hide() {
    const hide = setTimeout(() => { this.loading.next(false) }, 1000);
  }
}
