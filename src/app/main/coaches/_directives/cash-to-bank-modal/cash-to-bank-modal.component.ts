import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { tutors, eventCards } from 'src/app/app-support/constants/dummy-constants';

@Component({
  selector: 'app-cash-to-bank-modal',
  templateUrl: './cash-to-bank-modal.component.html',
  styleUrls: ['./cash-to-bank-modal.component.scss']
})
export class CashToBankModalComponent implements OnInit, OnDestroy {

  @Output() modalSignal: EventEmitter<any> = new EventEmitter<any>();
  @Input() data: any = {};
  loading = false;
  form: any = {};
  bankList: any[] = [
    {
      name: 'First Bank',
      id: 1,
    },
    {
      name: 'UBA',
      id: 2,
    },
    {
      name: 'Access Bank',
      id: 3,
    },
  ];

  constructor() { }

  ngOnInit(): void {
    this.setUpModal();
  }

  setUpModal(): void {
    console.log(this.data);
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

  onSubmit(): void {
    this.closeModal();
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
