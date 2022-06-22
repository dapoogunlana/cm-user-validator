import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { coachSessionData, eventSetupSchema, interests } from 'src/app/app-support/constants/dummy-constants';
import { agreements } from 'src/app/app-support/constants/dummy-writeups';
import { planAgreements } from 'src/app/app-support/constants/info-constants';
import { coachSetupPayload } from 'src/app/app-support/interfaces/sample-objects';
import { AuthStorageService } from 'src/app/app-support/services/authorization/auth-storage.service';
import { BookSessionService } from 'src/app/app-support/services/protegee-services/book-session.service';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';
import { FileUploadService } from 'src/app/app-support/services/general/file-upload.service';
import { timeConstants } from 'src/app/app-support/constants/core-constants';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit, OnDestroy {

  pricingPlans: any[] = [];
  coachSessionData = coachSessionData;
  progressLevel = 1;
  loadingProgress = false;
  newEvent = eventSetupSchema;
  activeDrag = false;
  timeConstants = timeConstants;

  constructor(
    private apiService: ApiLoaderService,
    private storage: AuthStorageService,
    private router: Router,
    private toastr: ToastrService,
    private fileUploadService: FileUploadService,
    // public bookSessionService: BookSessionService,
  ) { }

  ngOnInit(): void {
    this.setup();
  }

  setup(): void {}

  back(): void {
    this.progressLevel -= 1;
  }

  forward(): void {
    if (this.progressLevel < 3) {
      this.progressLevel += 1;
    }
    return;
  }

  processDrag(e: Event): void {
    e.preventDefault();
  }

  processDragEnter(e: Event): void {
    e.preventDefault();
    this.activeDrag = true;
  }

  processDragLeave(e: Event): void {
    e.preventDefault();
    this.activeDrag = false;
  }

  collectDragImage(e): void {
    e.preventDefault();
    this.activeDrag = false;
    this.processImage(e.dataTransfer.files[0]);
  }

  triggerImageSaver(): void {
    const imageInput = document.getElementById('hidden_image_holder');
    imageInput.click();
  }

  collectImage(ev): void {
    this.processImage(ev.target.files[0]);
  }

  processImage(file): void {
    if (!this.fileUploadService.checkFileFormat(file, 'image') || !this.fileUploadService.checkFileSize(file, 500, 'kb')) {
      this.discardImage();
      return;
    }
    const img = new Image();
    img.onload = (test: any) => {
      const height = test.path[0].height;
      const width = test.path[0].width;
      // this.imgPreview = true;
      const aspectRatio = (width / height);
      if (aspectRatio > 1.1 || aspectRatio < 0.9) {
        this.toastr.error('Please upload an image with aspect ratio of 1:1 (A square image)');
        this.discardImage();
        return;
      }
      // console.log(height, ' , ', width);
    };
    const fileReader = new FileReader();
    fileReader.onload = (data: any) => {
      this.newEvent.eventImage = data.target.result;
    };
    fileReader.readAsDataURL(file);
    console.log(URL.createObjectURL(file));
    img.src = URL.createObjectURL(file);
  }

  discardImage(): void {
    // this.imgPreview = false;
    this.newEvent.eventImage = null;
  }

  addCalenderDate(data): void {
    // this.imgPreview = false;
    this.newEvent.eventDate = data;
  }

  cancel(): void {
    this.router.navigateByUrl('/coach');
  }

  submit(): void {
    console.log('Finish');
    this.router.navigateByUrl('/coach');
  }

  ngOnDestroy(): void {}

}

