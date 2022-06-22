import { Component, OnInit, OnDestroy } from '@angular/core';
import { userDetail } from 'src/app/app-support/constants/dummy-constants';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';
import { UtilityService } from 'src/app/app-support/services/general/utility.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { profileDetails, profileExpertise, timezones } from 'src/app/app-support/constants/dummy-coach-constants';
import { agreementText, consultationOutlineText, DeclarationStatementText, expertiseCommitmentText, timeList } from 'src/app/app-support/constants/dummy-unboarding-constants';
import { TableLoaderService } from 'src/app/app-support/services/general/table-loader.service';
import { AuthStorageService } from 'src/app/app-support/services/authorization/auth-storage.service';
import { routeConstants } from 'src/app/app-support/constants/core-constants';

@Component({
  selector: 'app-coach-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class CoachProfileComponent implements OnInit, OnDestroy {

  userDetails: any = {};
  profileDetailsLoaded = false;
  activeTab = 'profileDetails';
  newNotification = false;
  notification: any = {};
  profileDetails: any = {};
  popularDomains: any[] = [];
  typeDomain = '';
  expertise: any = {};
  infoModalInfo = agreementText;
  showInfoModal = false;
  profileSettings: any = {};
  profileSettingsPassword: any = {};
  passwordType = 'password';
  passwordVisible = false;
  timeList = timeList;
  timezones = timezones;

  constructor(
    public utility: UtilityService,
    private apiService: ApiLoaderService,
    private router: Router,
    private toastr: ToastrService,
    public loaderService: TableLoaderService,
    public storageService: AuthStorageService,
  ) {
    this.userDetails = storageService.getObj('userDetails') || {};
  }

  ngOnInit(): void {
    this.getProfile();
  }

  fetchData(): void {
    setTimeout(() => {
      // this.loaderService.setLoaded();
      this.profileDetailsLoaded = true;
      this.newNotification = true;
      this.notification = {
        message: 'Ask CDCR San Quintin State Prison 2008. We installed Purex dispensers throughout the prison to combat ',
      }
    }, 1000);
  }

  switchTab(tab): void {
    this.activeTab = tab;
  }
  
  closeNotification(): void {
    this.newNotification = false;
  }

  editProfileInfo(): void {
    console.log('clicking');

  }

  uploadVideo(): void {
    document.getElementById('hidden-video-input').click();
  }

  captureVideo(ev): void {
    console.log(ev);
  }

  getProfile(): void {
    this.loaderService.setLoading();
    this.apiService.load({
      url: 'get-expert-profile',
      method: 'POST',
      data: {
        userId: this.userDetails.id
      },
      route: routeConstants.AUTHV1
    }).toPromise().then((res) => {
      console.log(res);
      this.profileDetails = res.details;
      this.profileDetails.profilePhoto = this.profileDetails.profilePhoto || profileDetails.profilePhoto
      this.expertise = res.expertise;
      this.profileSettings = res.settings;
    }).finally(() => {
      this.loaderService.setLoaded();
      this.profileDetailsLoaded = true;
    });
  }

  addDomain(domain: any): void {
    const sameDomain = this.expertise.coachDomains.find((item: any) => {
      return item.name.trim().toLocaleLowerCase() === domain.name.trim().toLocaleLowerCase();
    });
    if (sameDomain) {
      this.toastr.error('You have already chosen this domain');
      return;
    }
    this.expertise.coachDomains.push(domain);
  }

  // load resources

  // continue functional methods

  addDomainOnEnter(event): void {
    const code = event.keyCode;
    if (code === 13) {
      const sameDomain = this.expertise.coachDomains
      .find((item: any) => item.name.trim().toLocaleLowerCase() === this.typeDomain.trim().toLocaleLowerCase());
      if (sameDomain) {
        this.toastr.error('You have already chosen this domain');
        return;
      }
      if (this.typeDomain) {
        this.expertise.coachDomains.push({name: this.typeDomain, id: 0});
        this.typeDomain = '';
      }
    }
  }

  removeDomain(i): void {
    this.expertise.coachDomains.splice(i, 1);
  }

  openExpertiseInfoModal(): void {
    this.infoModalInfo = expertiseCommitmentText;
    this.showInfoModal = true;
  }

  openConsultationInfoModal(): void {
    this.infoModalInfo = consultationOutlineText;
    this.showInfoModal = true;
  }

  openTermsInfoModal(): void {
    this.infoModalInfo = DeclarationStatementText;
    this.showInfoModal = true;
  }
  closeInfoModal(action): void {
    this.showInfoModal = false;
  }

  toggleDisclaimer(): void {
    this.expertise.commitment.agreeToTerms =
    !this.expertise.commitment.agreeToTerms;
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

  logout() {
    this.storageService.logout();
  }

  ngOnDestroy(): void {}

}

