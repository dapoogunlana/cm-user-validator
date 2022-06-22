import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { tutors, eventCards } from 'src/app/app-support/constants/dummy-constants';
import { agreementText } from 'src/app/app-support/constants/dummy-unboarding-constants';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent implements OnInit, OnDestroy {

  @Output() modalSignal: EventEmitter<any> = new EventEmitter<any>();
  @Input() data: any = {};
  infoModalInfo = agreementText;

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

  closeModal(closeOption?): void {
    document.body.style.overflow = '';
    const vidModal: any = document.querySelector('.vid-modal');
    const modalContent: any = document.querySelector('.modal-content');
    if (vidModal && modalContent) {
      vidModal.style.opacity = '';
      modalContent.style.transform = '';
    }
    setTimeout(() => {
      this.modalSignal.emit(closeOption);
    }, 500);
  }

  ngOnDestroy(): void {
  }

}
