import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss']
})
export class CropperComponent implements OnInit, OnDestroy {

    @Output() modalSignal: EventEmitter<any> = new EventEmitter<any>();
    @Input() data: any = {};

  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor() {}

  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
    const vidModal: any = document.querySelector('.cropper');
    const modalContent: any = document.querySelector('.modal-content');
    setTimeout(() => {
      if (vidModal && modalContent) {
        vidModal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
      }
    }, 200);
  }

  fileChangeEvent(event: any): void {
      console.log(event);
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }
  imageLoaded(image?) {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
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

  ngOnDestroy(): void {}

}
