import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { tutors, eventCards } from 'src/app/app-support/constants/dummy-constants';

@Component({
  selector: 'app-group-ticket-modal',
  templateUrl: './group-ticket-modal.component.html',
  styleUrls: ['./group-ticket-modal.component.scss']
})
export class GroupTicketModalComponent implements OnInit, OnDestroy {

  @Output() modalSignal: EventEmitter<any> = new EventEmitter<any>();
  @Input() ticketDetail: any = {};
  form: any = {};

  constructor() { }

  ngOnInit(): void {
    this.sortType();
    if (!this.ticketDetail)
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

  sortType(): void {
    console.log(this.ticketDetail);
    if (this.ticketDetail.type === 'new') {
      this.form.ticketType = 'free';
    } else {
      this.form = {...this.ticketDetail.data}
    }
  }

  updatePrice(ev): void {
    if (ev.target.value === 'free') {
      this.form.price = 0;
    }
  }

  submitTicket(): void {
    this.closeModal({data: this.form, type: this.ticketDetail.type});
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
