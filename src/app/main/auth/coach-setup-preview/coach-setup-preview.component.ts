import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { routeConstants } from 'src/app/app-support/constants/core-constants';
import { AuthStorageService } from 'src/app/app-support/services/authorization/auth-storage.service';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';

@Component({
  selector: 'app-coach-setup-preview',
  templateUrl: './coach-setup-preview.component.html',
  styleUrls: ['./coach-setup-preview.component.scss']
})
export class CoachSetupPreviewComponent implements OnInit, OnDestroy {

  userDetails: any = {};
  form: any = {};
  loading = false;
  passwordType = 'password';
  passwordVisible = false;
  setupStepList: any[] = [];

  constructor(
    private apiService: ApiLoaderService,
    private storage: AuthStorageService,
    private router: Router,
    public storageService: AuthStorageService,
  ) {
    this.userDetails = storageService.getObj('userDetails') || {};
  }

  ngOnInit(): void {
    this.loadProgressDetail();
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
  loadProgressDetail(): void {
    this.apiService.load({
      url: 'register/retrieve-profile-configuration',
      method: 'POST',
      data: {
        userId: this.userDetails.id
      },
      route: routeConstants.AUTHV1
    }).toPromise().then((res) => {
      this.setupStepList = res.userStepsTracker;
    }).catch((err) => {
      console.log(err);
    });
  }

  proceed(): void {
    this.router.navigateByUrl('/auth/profile-setup');
    return;
    console.log('Submitting');
    this.loading = true;
    this.apiService.load({
      url: 'Coach/TopRatedCoaches/4',
      method: 'POST',
      data: {
        username: this.form.username,
      }
    }).toPromise().then((res) => {
      console.log(res);
      this.storage.saveObj('userDetails', res.data);
      this.storage.saveString('token', res.data.token);
      if (res.data.user === 'Coach') {
        this.router.navigateByUrl('/coach/');
      } else {
        this.router.navigateByUrl('/protegee/');
      }
      console.log(res);
    }).finally(() => {
      this.loading = false;
    });
  }

  ngOnDestroy(): void {}

}
