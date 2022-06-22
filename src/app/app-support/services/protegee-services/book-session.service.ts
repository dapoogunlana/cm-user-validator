import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { routeConstants } from '../../constants/core-constants';
import { AuthStorageService } from '../authorization/auth-storage.service';
import { ApiLoaderService } from '../general/api-loader.service';

@Injectable({
    providedIn: 'root'
})

export class BookSessionService {

    token: string;
    userDetails: any = {};
    setupData: any = {};
    userSteps: any[] = [];
    progressLevel = 0;
    loadingProgress = false;
    pricingPlans: any[] = [];
    countries: any[] = [];
    activeBillAgreement: any;
    isCompleted = false;

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
        // To be removed
        // this.userDetails.id = 'aec4051d-1686-4aba-8304-5efa161b3435';
    }

    setup(): void {
      this.getCoachInfo();
      this.loadPricingPlans();
      this.loadCountries();
      console.log(this.userDetails);
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

    loadCountries(): void {
      this.apiService.load({
        url: 'Configuration/AllCountries',
      }).toPromise().then((res) => {
        this.countries = res || [];
      });
    }

    getCoachInfo(count?: number): void {
      this.apiService.load({
        url: 'register/retrieve-profile-configuration',
        method: 'POST',
        data: {
          userId: this.userDetails.id
        },
        route: routeConstants.AUTH
      }).toPromise().then(
        res => {
          this.setupData = res.profilePages;
          this.userSteps = res.userStepsTracker;
          if (!count) {
            this.progressLevel = res.currentPageNumber;
            if (res.currentPageNumber === 6) {
              this.sortActiveBilling();
            }
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
          if (this.pricingPlans.length > 0) {
              this.populatePricingPlanData();
          }
        }
      ).catch(
        err => {
          console.log(err);
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
      if (this.progressLevel < 7) {
        payloadProgress = this.progressLevel + 1;
      } else {
        payloadProgress = this.progressLevel;
      }
      if (count === 7) {
        this.isCompleted = true;
      }
      this.userSteps[this.progressLevel].isCompleted = true;
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
        route: routeConstants.AUTH
      }).toPromise().then(
        res => {
          console.log(res);
          if (count === 7) {
            this.router.navigateByUrl('/coach');
          } else {
            this.getCoachInfo(count);
          }
          this.toastr.success('Saved');
          this.uploadingStage = 0;
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
          this.getCoachInfo(3);
          this.toastr.success('Saved');
          this.uploadVideo = 'Upload';
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

    verifyFarward1(): boolean {
        if (this.setupData.coachDomains.customDomains.length === 0) {
            this.toastr.error('You have not selected any Expertise Domain. please include at least one to proceed');
            return;
        }
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
        if (!this.setupData.professionalInformationPage.linkedInProfileUrl) {
            this.toastr.error('LinkedIn profile link is required');
            return;
        }
        if (!this.setupData.professionalInformationPage.countryId) {
            this.toastr.error('Country is required');
            return;
        }
        if (!this.setupData.professionalInformationPage.professionalSummary) {
            this.toastr.error('Professional summary is required');
            return;
        }
        this.saveCoachInfo(2);
    }
    verifyFarward3(): boolean {
        if (!this.setupData.profilePicturePage.pictureBase64String) {
            this.toastr.error('You need to upload an image to proceed');
            return;
        }
        this.saveCoachInfo(3);
    }
    verifyFarward4(): boolean {
        const vidParam = this.setupData.profileVideoPage;
        if (!vidParam.expertYoutubeUrl && !vidParam.videoRetrievalLocation && this.uploadingStage !== 2) {
            this.toastr.error('You need to upload a video or paste a youtube video link to proceed');
            return;
        }
        this.saveCoachInfo(4);
    }
    verifyFarward5(): boolean {
        const expertise = this.setupData.profileExpertisePage;
        if (!expertise.expertiseCommitment) {
            this.toastr.error('You can not proceed without specifying your expertise commitment');
            return;
        }
        if (!expertise.isExtendedDeepDiveAdvisoryService && !expertise.isOneOffConsultingService) {
            this.toastr.error('You have not selected any service type');
            return;
        }
        if (
            (expertise.isExtendedDeepDiveAdvisoryService && !expertise.extendedDeepDiveAdvisoryServiceText) ||
            (expertise.isOneOffConsultingService && !expertise.oneOffConsultingServiceText)
        ) {
            this.toastr.error('You need a descriptive text for this service');
            return;
        }
        this.saveCoachInfo(5);
    }
    verifyFarward6(): boolean {
      const plans: any[] = this.setupData.profileBillingConfigurationPage.selectedBillings;
      const activePlans = plans.filter((item) => item.selected);
      if (activePlans.length < 1) {
        this.toastr.error('You need to choose at least one biling plan to proceed');
        return;
      }
      let agreementError = false;
      let pricingError = false;
      activePlans.map((item) => {
        if (!item.pricing || item.pricing < 1) {
          pricingError = true;
        }
        if (!item.agreedtoTerms) {
          agreementError = true;
        }
      });
      if (pricingError) {
          this.toastr.error('You have to enter a valid price for any billing plan you select');
          return;
      }
      if (agreementError) {
          this.toastr.error('You have to accept terms and conditions for any billing plan you select');
          return;
      }
      this.saveCoachInfo(6);
    }

    processFarward2(): void {
      this.progressLevel = 2;
    }
    processFarward3(): void {
      this.progressLevel = 3;
    }
    processFarward4(): void {
      this.progressLevel = 4;
      if (this.setupData.profileVideoPage.videoRetrievalLocation) {
        this.uploadingStage = 2;
      }
    }
    processFarward5(): void {
      this.progressLevel = 5;
    }
    processFarward6(): void {
      this.sortActiveBilling();
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
