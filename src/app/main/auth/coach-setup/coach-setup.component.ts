import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { imageExtensionList, routeConstants, videoExtensionList } from 'src/app/app-support/constants/core-constants';
import { interests } from 'src/app/app-support/constants/dummy-constants';
import { agreementText, consultationOutlineText, DeclarationStatementText, expertiseCommitmentText, onboardingProgressArray, timeListTranslation } from 'src/app/app-support/constants/dummy-unboarding-constants';
import { agreements } from 'src/app/app-support/constants/dummy-writeups';
import { planAgreements } from 'src/app/app-support/constants/info-constants';
import { coachSetupPayload } from 'src/app/app-support/interfaces/sample-objects';
import { AuthStorageService } from 'src/app/app-support/services/authorization/auth-storage.service';
import { CoachSetupService } from 'src/app/app-support/services/coach-services/coach-setup.service';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';
import { FileUploadService } from 'src/app/app-support/services/general/file-upload.service';

@Component({
  selector: 'app-coach-setup',
  templateUrl: './coach-setup.component.html',
  styleUrls: ['./coach-setup.component.scss']
})
export class CoachSetupComponent implements OnInit, OnDestroy {

  showSidebar = false;
  payload = coachSetupPayload;
  processArray = onboardingProgressArray;

  professionalInfo: any = {};
  videoUrl: any = {};
  expertise: any = {
    one_off: false,
    extended: false,
  };
  activeDrag = false;
  // imgPreview = false;
  // previewImage: any;
  vidPreview = false;
  previewVideo: any;
  videoName: string;
  rawVideoFile: any;
  interests = interests;
  typeDomain = '';
  // activeDomains: any[] = [];
  // popularDomains: any[] = ['ICAN', 'IELTS', 'Foriegn Scholarship', 'MCAT', 'SAT Exam', 'Tech Startup'];
  // acceptDisclaimer = false;
  showInfoModal = false;
  showPlanAgreementModal = false;
  imageExtensionList = imageExtensionList;
  videoExtensionList = videoExtensionList;
  passwordType = 'password';
  passwordVisible = false;
  timeListTranslation = timeListTranslation;

  infoModalInfo = agreementText;

  constructor(
    private apiService: ApiLoaderService,
    private storage: AuthStorageService,
    private router: Router,
    private toastr: ToastrService,
    private fileUploadService: FileUploadService,
    public coachSetupService: CoachSetupService,
  ) { }

  ngOnInit(): void {
    this.coachSetupService.setup();
  }

  togglePasswordVisibility(key): void {
    if (key) {
      this.passwordVisible = true;
      this.passwordType = 'text';
    } else {
      this.passwordVisible = false;
      this.passwordType = 'password';
    }
  }

  openSideBar(): void {
    this.showSidebar = true;
    console.log('Showing');
  }

  hideSideBar(): void {
    this.showSidebar = false;
    console.log('Hiding');
  }

  back(): void {
    this.coachSetupService.progressLevel -= 1;
  }

  forward(): void {
    switch (this.coachSetupService.progressLevel) {
      case 0:
        this.coachSetupService.verifyFarward0();
        break;
      case 1:
        this.coachSetupService.verifyFarward1();
        break;
      case 2:
        this.coachSetupService.verifyFarward2();
        break;
      case 3:
        this.coachSetupService.verifyFarward3();
        break;
      case 4:
        this.coachSetupService.verifyFarward4();
        break;
      case 5:
        this.coachSetupService.verifyFarward5();
        break;
      case 6:
        this.coachSetupService.verifyFarward6();
        break;
      default:
        this.coachSetupService.progressLevel += 1;
    }
  }

  toggleActive(index): void {
    const interest = this.interests[index];
    interest.active = !interest.active;
  }

  addDomain(domain: any): void {
    const sameDomain = this.coachSetupService.setupData.professionalInformationPage.coachDomains.find((item: any) => {
      return item.name.trim().toLocaleLowerCase() === domain.name.trim().toLocaleLowerCase();
    });
    if (sameDomain) {
      this.toastr.error('You have already chosen this domain');
      return;
    }
    this.coachSetupService.setupData.professionalInformationPage.coachDomains.push(domain);
  }

  // load resources

  // continue functional methods

  addDomainOnEnter(event): void {
    const code = event.keyCode;
    if (code === 13) {
      const sameDomain = this.coachSetupService.setupData.professionalInformationPage.coachDomains
      .find((item: any) => item.name.trim().toLocaleLowerCase() === this.typeDomain.trim().toLocaleLowerCase());
      if (sameDomain) {
        this.toastr.error('You have already chosen this domain');
        return;
      }
      if (this.typeDomain) {
        this.coachSetupService.setupData.professionalInformationPage.coachDomains.push({name: this.typeDomain, id: 0});
        this.typeDomain = '';
      }
    }
  }

  removeDomain(i): void {
    this.coachSetupService.setupData.professionalInformationPage.coachDomains.splice(i, 1);
  }

  triggerImageSaver(): void {
    const imageInput = document.getElementById('hidden_image_holder');
    imageInput.click();
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
      this.coachSetupService.setupData.profileMediaPage.profilePicture = data.target.result;
    };
    fileReader.readAsDataURL(file);
    console.log(URL.createObjectURL(file));
    img.src = URL.createObjectURL(file);
  }

  discardImage(): void {
    // this.imgPreview = false;
    this.coachSetupService.setupData.profileMediaPage.profilePicture = null;
  }

  triggerVideoSaver(): void {
    const videoInput = document.getElementById('hidden_video_holder');
    videoInput.click();
  }

  collectDragVideo(ev): void {
    ev.preventDefault();
    this.activeDrag = false;
    this.processVideo(ev.dataTransfer.files[0]);
  }

  collectVideo(ev): void {
    this.processVideo(ev.target.files[0]);
  }

  processVideo(file): void {
    console.log(file);
    if (!this.fileUploadService.checkFileFormat(file, 'video') || !this.fileUploadService.checkFileSize(file, 20, 'mb')) {
      this.discardVideo();
      return;
    }
    this.rawVideoFile = file;
    const fileReader = new FileReader();
    fileReader.onload = (data: any) => {
      this.vidPreview = true;
      this.previewVideo = data.target.result;
      this.videoName = file.name;
      // console.log(this.previewVideo);
    };
    fileReader.readAsDataURL(file);
    // const blob = new Blob(file);
    // console.log(blob);
    // this.vidPreview = true;
    // this.previewVideo = file;
    // const previewVid: any = document.getElementById('preview_vid');
    // previewVid.srcObject = file;
    // console.log(ll);
  }

  discardVideo(): void {
    this.vidPreview = false;
    this.previewVideo = null;
    this.videoName = null;
    this.rawVideoFile = null;
    this.coachSetupService.uploadingStage = 0;
  }


  toggleExpertise(plan): void {
    this.coachSetupService.setupData.profileExpertisePage[plan] = !this.coachSetupService.setupData.profileExpertisePage[plan];
    console.log(this.coachSetupService.setupData.profileExpertisePage);
  }

  showAgreement(id): void {
    const active = agreements.find((item) => item.id === id);
    if (active) {
      console.log(active);
      this.coachSetupService.activeBillAgreement = active;
      this.showPlanAgreementModal = true;
    }
  }

  togglePlanAgreement(index): void {
    this.coachSetupService.setupData.profileBillingConfigurationPage.selectedBillings[index].agreedtoTerms =
    !this.coachSetupService.setupData.profileBillingConfigurationPage.selectedBillings[index].agreedtoTerms;
  }

  sortBilling(): void {
    console.log('Runing Billing');
    this.coachSetupService.activeBillAgreement = [];
    this.coachSetupService.pricingPlans.map((plan) => {
      if (plan.active) {
        const realPlan = planAgreements.find((item) => item.id === plan.id);
        if (realPlan) {
          this.coachSetupService.activeBillAgreement.push({name: realPlan.name, agreement: realPlan.agreement});
        }
      }
    });
    this.showPlanAgreementModal = true;
  }

  agreetoBilling(action): void {
    this.showPlanAgreementModal = false;
    if (action) {
      this.coachSetupService.progressLevel += 1;
    }
  }

  openInfoModal(): void {
    console.log(this.coachSetupService.infoModalInfo);
    this.showInfoModal = true;
  }

  openExpertiseInfoModal(): void {
    this.coachSetupService.infoModalInfo = expertiseCommitmentText;
    this.showInfoModal = true;
  }

  openConsultationInfoModal(): void {
    this.coachSetupService.infoModalInfo = consultationOutlineText;
    this.showInfoModal = true;
  }

  openTermsInfoModal(): void {
    this.coachSetupService.infoModalInfo = DeclarationStatementText;
    this.showInfoModal = true;
  }

  closeInfoModal(action): void {
    this.showInfoModal = false;
    this.showPlanAgreementModal = false;
    if (action) {
      this.coachSetupService.progressLevel += 1;
    }
  }

  switchActive(index): void {
    this.coachSetupService.setupData.profileBillingConfigurationPage.selectedBillings[index].selected =
    !this.coachSetupService.setupData.profileBillingConfigurationPage.selectedBillings[index].selected;
  }



  generateMinDate(): any {
    const oldestYear = new Date().getFullYear();
    return {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()}
  }

  switchAvailabilityActive(field): void {
    this.coachSetupService.setupData.availabilityPage.serviceScheduling[field].active =
    !this.coachSetupService.setupData.availabilityPage.serviceScheduling[field].active;
  }

  updateEndtime(ev, field): void {
    this.coachSetupService.availabilitySchedullerData[field].endTime = ev.target.value;
    console.log({
      endTime: this.coachSetupService.availabilitySchedullerData[field].endTime,
      serviceScheduling: this.coachSetupService.setupData.availabilityPage.serviceScheduling[field].hours
    });
  }

  addAvailableHours(field): void {
    const startTime = parseFloat(this.coachSetupService.availabilitySchedullerData[field].startTime);
    const endTime = parseFloat(this.coachSetupService.availabilitySchedullerData[field].endTime);
    if ((!startTime && startTime !== 0) || (!endTime && endTime !== 0)) {
      this.toastr.error('Please enter a valid start time and end time');
      return;
    }
    if (endTime <= startTime) {
      this.toastr.error('Availability end time should be later than start time');
      return;
    }
    let conflictingTime = false;
    this.coachSetupService.setupData.availabilityPage.serviceScheduling[field].hours.map((item, index) => {
      if(startTime < item.to && endTime > item.from) {
        conflictingTime = true;
        console.log('Conflicting');
        console.log(item);
      } else {
        console.log('Not Conflicting');
      }
    });
    if (conflictingTime) {
      this.toastr.error('Time space chosen is overlapping an already existing time space');
      return;
    }
    this.coachSetupService.setupData.availabilityPage.serviceScheduling[field].hours.push({
      from: startTime,
      to: endTime
    });
    this.coachSetupService.availabilitySchedullerData[field] = {}
    console.log({
      endTime: this.coachSetupService.availabilitySchedullerData[field].endTime,
      startTime: this.coachSetupService.availabilitySchedullerData[field].startTime,
      serviceScheduling: this.coachSetupService.setupData.availabilityPage.serviceScheduling[field].hours
    });
  }

  removeTimeBlock(field, index): void {
    this.coachSetupService.setupData.availabilityPage.serviceScheduling[field].hours.splice(index, 1);
  }

  toggleAlwaysAvailable(): void {
    this.coachSetupService.setupData.availabilityPage.alwaysAvailable =
    !this.coachSetupService.setupData.availabilityPage.alwaysAvailable;
  }

  toggleDisclaimer(): void {
    this.coachSetupService.setupData.agreementPage.agreeToTerms =
    !this.coachSetupService.setupData.agreementPage.agreeToTerms;
  }

  updateCoachInfo(): any {
    return this.apiService.load({
      url: 'register/retrieve-profile-configuration',
      method: 'POST',
      data: this.payload
    });
  }

  finish(): void {
    console.log('Finish');
    this.router.navigateByUrl('/coach');
  }

  logData(): void {
    console.log(this.coachSetupService.setupData);
  }

  ngOnDestroy(): void {}

}

