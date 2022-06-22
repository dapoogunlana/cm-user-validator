import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { routeConstants } from 'src/app/app-support/constants/core-constants';
import { AuthStorageService } from 'src/app/app-support/services/authorization/auth-storage.service';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';

@Component({
  selector: 'app-choose-password',
  templateUrl: './choose-password.component.html',
  styleUrls: ['./choose-password.component.scss']
})
export class ChoosePasswordComponent implements OnInit, OnDestroy {

  form: any = {};
  loading = false;
  passwordType = 'password';
  passwordVisible = false;
  userDetails: any = {};

  constructor(
    private apiService: ApiLoaderService,
    private storage: AuthStorageService,
    private router: Router,
    public storageService: AuthStorageService,
    private toastr: ToastrService,
  ) {
    this.userDetails = storageService.getObj('userDetails') || {};
  }

  ngOnInit(): void {}

  togglePasswordVisibility(key): void {
    if (key) {
      this.passwordVisible = true;
      this.passwordType = 'text';
    } else {
      this.passwordVisible = false;
      this.passwordType = 'password';
    }
  }

  onSubmit(): void {
    if (this.form.password.length < 6) {
      this.toastr.error('Password can not be less than 6 characters');
      return;
    }
    if (this.form.password !== this.form.password2) {
      this.toastr.error('Passwords do not match');
      return;
    }
    this.loading = true;
    this.apiService.load({
      url: 'invitation/set-password',
      method: 'POST',
      data: {
        newPassword: this.form.password,
        confirmPassword: this.form.password2,
        invitationId: this.storageService.getString('invitationId')
      },
      route: routeConstants.AUTH
    }).toPromise().then((res) => {
      this.storage.saveObj('userDetails', res);
      this.storage.saveString('token', res.authToken);
      this.loading = false;
      const override = true;
      if (res.userRole === 'coach') {
        // if (!res.isEmailVerified && !override) {
        //   this.router.navigateByUrl('/auth/confirm-email');
        //   return;
        // }
        // if (res.isRegistrationApproved) {
        //   this.router.navigateByUrl('/coach');
        //   return;
        // }
        // if (res.isRegistrationCompleted) {
        //   this.router.navigateByUrl('/auth/awaiting-approval');
        //   return;
        // }
        if (res.isRegistrationCompleted) {
          this.router.navigateByUrl('/coach');
          return;
        }
        if (!res.isRegistrationCompleted) {
          this.router.navigateByUrl('/auth/overview');
          return;
        }
      }
      if (res.userRole === 'protegee') {
        this.router.navigateByUrl('/protegee');
      }
    }).catch((err) => {
      this.loading = false;
      this.toastr.error(err.error.message || 'An error occoured');
    }).finally(() => {
      this.loading = false;
    });
  }

  ngOnDestroy(): void {}

}
