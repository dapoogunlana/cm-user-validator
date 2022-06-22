import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { routeConstants } from '../../constants/core-constants';
import { agreementText, coachUnboardingData, timeList } from '../../constants/dummy-unboarding-constants';
import { AuthStorageService } from '../authorization/auth-storage.service';
import { ApiLoaderService } from '../general/api-loader.service';

@Injectable({
    providedIn: 'root'
})

export class CoachSetupService {

    token: string;
    userDetails: any = {};
    setupData: any = {};
    userSteps: any[] = [];
    progressLevel = 0;
    highestProgressLevel = 0;
    loadingProgress = false;
    pricingPlans: any[] = [];
    popularDomains: any[] = [];
    countries: any[] = [];
    activeBillAgreement: any;
    isCompleted = false;
    timeList = timeList;
    availabilitySchedullerData: any = {
      sunday: {},
      monday: {},
      tuesday: {},
      wednesday: {},
      thursday: {},
      friday: {},
      saturday: {},
    }
  
    infoModalInfo = agreementText;

    uploadVideo = 'Upload';
    uploadingStage = 0;

    loadingMessage = '';

    constructor(
        public storageService: AuthStorageService,
        private apiService: ApiLoaderService,
        private router: Router,
        private toastr: ToastrService,
    ) {
        this.token = storageService.getString('token');
        this.userDetails = storageService.getObj('userDetails');
        console.log(this.userDetails);
        // To be removed
        // this.userDetails.id = 'aec4051d-1686-4aba-8304-5efa161b3435';
    }

    setup(): void {
      this.getCoachInfo();
      this.loadPricingPlans();
      this.loadPopularDomains();
      this.loadCountries();
      console.log(this.userDetails);
    }

    goToLevel(index): void {
      this.progressLevel = index;
    }

    proceedToLevel(index): void {
      this.progressLevel = index;
      if (this.highestProgressLevel < index) {
        this.highestProgressLevel = index;
      }
    }

    loadPricingPlans(): void {
      this.apiService.load({
        url: 'Configuration/AllPricingPlans',
      }).toPromise().then((res) => {
        this.pricingPlans = res || [];
        if (this.setupData.profileBillingConfigurationPage) {
            this.populatePricingPlanData();
        }
      });
    }

    loadPopularDomains(): void {
      this.apiService.load({
        url: 'Configuration/AllPricingPlans',
      }).toPromise().then((res) => {
        this.popularDomains = res || [];
      }).finally(() => {
        this.popularDomains = [
          { name: 'Mobile Development', id: 3 },
          { name: 'Web Development', id: 4 },
          { name: 'UI Design', id: 5 },
        ];
      });
    }

    loadCountries(): void {
      this.apiService.load({
        url: 'Configuration/AllCountries',
      }).toPromise().then((res) => {
        this.countries = res || [];
      });
    }

    getCoachInfo(count?: number): void {
      // setTimeout(() => {
      //   this.setupData = coachUnboardingData.profilePages;
      //   this.userSteps = coachUnboardingData.userStepsTracker;
      //   // this.progressLevel = 5;
      // }, 2000);
      // return;
      this.apiService.load({
        url: 'register/retrieve-profile-configuration',
        method: 'POST',
        data: {
          userId: this.userDetails.id
        },
        route: routeConstants.AUTHV1
      }).toPromise().then(
        res => {
          this.setupData = res.profilePages;

          // // temporary
          // this.setupData.availabilityPage = res.profilePages.availability;
          // this.setupData.availabilityPage.serviceScheduling = {
          //   sunday: res.profilePages.availability.serviceSchedulings.Sunday,
          //   monday: res.profilePages.availability.serviceSchedulings.Monday,
          //   tuesday: res.profilePages.availability.serviceSchedulings.Tuesday,
          //   wednesday: res.profilePages.availability.serviceSchedulings.Wednesday,
          //   thursday: res.profilePages.availability.serviceSchedulings.Thursday,
          //   friday: res.profilePages.availability.serviceSchedulings.Friday,
          //   saturday: res.profilePages.availability.serviceSchedulings.Saturday,
          // };

          this.userSteps = res.userStepsTracker;
          this.uploadingStage = 0;
          if (!count) {
            this.progressLevel = res.currentPageNumber;
          } else {
            switch (count) {
              case 1:
                this.processFarward2();
                break;
              case 2:
                this.processFarward3();
                break;
              case 3:
                this.processFarward4();
                break;
              case 4:
                this.processFarward5();
                break;
              case 5:
                this.processFarward6();
                break;
              case 6:
                this.processFarward7();
                break;
            }
            this.loadingProgress = false;
          }
          // if (this.pricingPlans.length > 0) {
          //     this.populatePricingPlanData();
          // }
        }
      ).catch(
        err => {
          console.log(err);
          this.uploadingStage = 0;
        }
      );
    }

    populatePricingPlanData(): void {
        this.setupData.profileBillingConfigurationPage.selectedBillings =
        this.setupData.profileBillingConfigurationPage.selectedBillings.map((bill: any, index: number) => {
            const fullBill = this.pricingPlans.find((item) => item.id === bill.id);
            if (fullBill) {
                bill.extra = {
                    briefSummary: fullBill.briefSummary,
                    descriptions: fullBill.descriptions,
                    disabled: bill.extra.disabled || false,
                };
            }
            return bill;
        });
    }

    saveCoachInfo(count: number): void {
      this.loadingProgress = true;
      this.uploadingStage = 1;
      let payloadProgress;
      if (count === 5) {
        this.isCompleted = true;
      }
      if (this.progressLevel < 6) {
        this.userSteps[this.progressLevel].isCompleted = true;
      }
      if (this.progressLevel < 5) {
        this.userSteps[this.progressLevel + 1].isOpen = true;
      }
      if (this.progressLevel <= 6) {
        payloadProgress = this.progressLevel + 1;
      } else {
        payloadProgress = this.progressLevel;
      }
      // setTimeout(() => {
      //   this.loadingProgress = false;
      //   this.uploadingStage = 0;
      //   this.progressLevel = payloadProgress;
      //   console.log(coachUnboardingData);
      // }, 1000);
      // return;
      this.apiService.load({
        url: 'register/update-profile-configuration',
        method: 'POST',
        data: {
          profilePages: this.setupData,
          isCompleted: this.isCompleted,
          currentPageNumber: payloadProgress,
          userStepsTracker: this.userSteps,
          userId: this.userDetails.id
        },
        route: routeConstants.AUTHV1
      }).toPromise().then(
        res => {
          // console.log(res);
          // if (count === 7) {
          //   this.router.navigateByUrl('/coach');
          // } else {
          //   this.getCoachInfo(count);
          // }
          this.getCoachInfo(count);
          this.toastr.success('Saved');
        }
      ).catch(
        err => {
          console.log(err.response);
          this.toastr.error(err.message || 'Unable to save, please check your internet connectivity');
          this.loadingProgress = false;
          this.uploadingStage = 0;
        }
      );
    }

    saveCoachVideo(file: File): void {
      const dotPos = file.name.lastIndexOf('.');
      const extension = file.name.substring(dotPos);
      const formData = new FormData();
      formData.append(`file`, file);
      this.loadingProgress = true;
      this.uploadVideo = 'Uploading...';
      this.uploadingStage = 1;
      this.apiService.load({
        url: 'file/' + this.userDetails.id,
        method: 'POST FILE',
        data: formData,
        route: routeConstants.NFR,
        headers: {
            accept: '*/*',
            'Content-Type': 'multipart/form-data'
        }
      }).toPromise().then(
        res => {
          console.log(res);
          this.toastr.success('Saved');
          this.uploadVideo = 'Uploaded';
          this.setupData.profileMediaPage.profileVideoAttachedLink = res.fileName;
          // this.saveCoachInfo(3);
          this.uploadingStage = 2;
        }
      ).catch(
        err => {
          this.toastr.error(err.message || 'Unable to save, please check your internet connectivity');
          this.loadingProgress = false;
          this.uploadVideo = 'Upload';
          this.uploadingStage = 0;
        }
      );
    }

    verifyFarward0(): void {
      this.saveCoachInfo(0);
  }

    verifyFarward1(): boolean {
        // if (!this.setupData.registrationPage.fristName) {
        //     this.toastr.error('First Name is required');
        //     return;
        // }
        // if (!this.setupData.registrationPage.lastName) {
        //     this.toastr.error('Last Name is required');
        //     return;
        // }
        if (!this.setupData.registrationPage.username) {
            this.toastr.error('Username is required');
            return;
        }
        // if (!this.setupData.registrationPage.email) {
        //     this.toastr.error('Email is required');
        //     return;
        // }
        // if (!this.setupData.registrationPage.password) {
        //     this.toastr.error('Password is required');
        //     return;
        // }
        this.saveCoachInfo(1);
    }
    verifyFarward2(): boolean {
        if (!this.setupData.professionalInformationPage.jobTitle) {
            this.toastr.error('Job title is required');
            return;
        }
        if (!this.setupData.professionalInformationPage.companyName) {
            this.toastr.error('Company name is required');
            return;
        }
        if (!this.setupData.professionalInformationPage.industryName) {
            this.toastr.error('Industry name is required');
            return;
        }
        // if (!this.setupData.professionalInformationPage.countryId) {
        //     this.toastr.error('Country is required');
        //     return;
        // }
        if (!this.setupData.professionalInformationPage.professionalSummary) {
            this.toastr.error('Professional summary is required');
            return;
        }
        if (this.setupData.professionalInformationPage.coachDomains.length === 0) {
            this.toastr.error('Please enter at least one domain of expertise to proceed');
            return;
        }
        this.saveCoachInfo(2);
    }
    verifyFarward3(): boolean {
        if (!this.setupData.profileMediaPage.profilePicture) {
            this.toastr.error('You need to upload an image to proceed');
            return;
        }
        if (!this.setupData.profileMediaPage.profileVideoAttachedLink && !this.setupData.profileMediaPage.profileVideoWrittenLink) {
            this.toastr.error('You have not provided an introductry video, please bear in mind that your profile would remain inactive even after registration until you have provided a video');
        }
        // const vidParam = this.setupData.profileVideoPage;
        // if (!vidParam.expertYoutubeUrl && !vidParam.videoRetrievalLocation && this.uploadingStage !== 2) {
        //     this.toastr.error('You need to upload a video or paste a youtube video link to proceed');
        //     return;
        // }
        // if (vidParam.expertYoutubeUrl && vidParam.expertYoutubeUrl.indexOf('http') === -1) {
        //   this.toastr.error('You have entered an invalid video url');
        //   return;
        // }
        this.saveCoachInfo(3);
    }
    verifyFarward4(): any {
      const availability = this.setupData.availabilityPage;
      if (!availability.alwaysAvailable && (!availability.startDate || !availability.endDate)) {
        this.toastr.error('You can not proceed without information on the long term range of days you would be available');
        return;
      }
      if (new Date(availability.startDate).getTime() >=  new Date(availability.endDate).getTime()) {
        this.toastr.error('Your end date has to be later than your start date');
        return;
      }
      if (!availability.hourlyRate) {
          this.toastr.error('You can not proceed without entering a valid hourly rate');
          return;
      }
      const schedule = availability.serviceScheduling;
      let  activeDays = false;
      let  availableDates = false;
      let  emptyDays = false;
      for (const day in schedule) {
        if (day) {
          if (schedule[day].active) {
            activeDays = true;
          }
          if (schedule[day].hours.length > 0) {
            availableDates = true;
          }
          if (schedule[day].active && schedule[day].hours.length === 0) {
            emptyDays = true;
          }
        }
      }
      if (!activeDays) {
          this.toastr.error('You can not proceed without having an active day');
          return;
      }
      if (!availableDates) {
          this.toastr.error('You can not proceed without choosing an valid available period');
          return;
      }
      if (emptyDays) {
          this.toastr.error('You have some active days without any available time, please add available time or deactivate the unused days');
          return;
      }
        this.saveCoachInfo(4);
    }
    verifyFarward5(): boolean {
        const agreement = this.setupData.agreementPage;
        if (!agreement.expertiseCommitment) {
            this.toastr.error('You can not proceed without specifying your expertise commitment');
            return;
        }
        if (!agreement.consultationOutline) {
            this.toastr.error('You need a descriptive explanation of your course outline');
            return;
        }
        if (!agreement.agreeToTerms) {
            this.toastr.error('You can not proceed without agreeing to declaration statement');
            return;
        }
        this.saveCoachInfo(5);
    }
    verifyFarward6(): void {
      this.router.navigateByUrl('/coach');
      this.toastr.success('Setup successful');
    }

    processFarward2(): void {
      this.progressLevel = 2;
    }
    processFarward3(): void {
      this.progressLevel = 3;
    }
    processFarward4(): void {
      this.progressLevel = 4;
      if (this.setupData.profileMediaPage.profileVideoAttachedLink) {
        this.uploadingStage = 2;
      }
    }
    processFarward5(): void {
      this.progressLevel = 5;
    }
    processFarward6(): void {
      // this.sortActiveBilling();
      this.progressLevel = 6;
    }
    processFarward7(): void {
      this.progressLevel = 7;
    }
    sortActiveBilling(): void {
      const expertise = this.setupData.profileExpertisePage;
      const billPlans: any[] = this.setupData.profileBillingConfigurationPage.selectedBillings;
      billPlans.map((plan) => {
        plan.extra.disabled = true;
        return plan;
      });
      billPlans.map((plan) => {
        if (expertise.isOneOffConsultingService) {
          if (plan.id === 1) {
            plan.extra.disabled = false;
          }
        }
        if (expertise.isExtendedDeepDiveAdvisoryService) {
          if (plan.id === 2 || plan.id === 3 || plan.id === 4) {
            plan.extra.disabled = false;
          }
        }
      });
    }

    submit(): void {
      const declerations = this.setupData.profileDeclarationPage.isDeclarationStatementChecked;
      if (!declerations) {
        this.toastr.error('You need to accept our decleration statement to proceed');
        return;
      }
      this.saveCoachInfo(7);
    }

}
