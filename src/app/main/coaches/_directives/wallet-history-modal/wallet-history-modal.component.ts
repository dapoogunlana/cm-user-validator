import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { walletHistory } from 'src/app/app-support/constants/dummy-constants';

@Component({
  selector: 'app-wallet-history-modal',
  templateUrl: './wallet-history-modal.component.html',
  styleUrls: ['./wallet-history-modal.component.scss']
})
export class WalletHistoryModalComponent implements OnInit, OnDestroy {

  @Output() modalSignal: EventEmitter<any> = new EventEmitter<any>();
  @Input() data: any = {};
  loaded = false;
  walletHistory: any[] = walletHistory;

  constructor() { }

  ngOnInit(): void {
    this.setUpModal();
    this.loadInfo();
  }

  loadInfo(): void {
    setTimeout(() => {
      this.loaded = true;
    }, 1000);
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
