import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { tutors, eventCards } from 'src/app/app-support/constants/dummy-constants';

@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.component.html',
  styleUrls: ['./video-modal.component.scss']
})
export class VideoModalComponent implements OnInit, OnDestroy {

  @Output() modalSignal: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
    const vidModal: any = document.querySelector('.vid-modal');
    const modalContent: any = document.querySelector('.modal-content');
    setTimeout(() => {
      if (vidModal && modalContent) {
        vidModal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
      }
    }, 200);
  }

  closeModal(): void {
    document.body.style.overflow = '';
    const vidModal: any = document.querySelector('.vid-modal');
    const modalContent: any = document.querySelector('.modal-content');
    if (vidModal && modalContent) {
      vidModal.style.opacity = '';
      modalContent.style.transform = '';
    }
    setTimeout(() => {
      this.modalSignal.emit();
    }, 500);
  }

  ngOnDestroy(): void {
  }

}
