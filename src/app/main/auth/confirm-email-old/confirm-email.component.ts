import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { routeConstants } from 'src/app/app-support/constants/core-constants';
import { AuthStorageService } from 'src/app/app-support/services/authorization/auth-storage.service';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';

@Component({
  selector: 'app-confirm-email-old',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class OldConfirmEmailComponent implements OnInit, OnDestroy {

  form: any = {};
  userDetails: any = {};
  loading = false;
  passwordType = 'password';
  passwordVisible = false;
  canResend = false;

  constructor(
    private apiService: ApiLoaderService,
    private storage: AuthStorageService,
    private router: Router,
    public storageService: AuthStorageService,
    private toastr: ToastrService,
  ) {
    this.userDetails = storageService.getObj('userDetails') || {};
  }

  ngOnInit(): void {
    this.handleResend();
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

  handleResend(): void {
    this.canResend = false;
    setTimeout(() => {
      this.canResend = true;
    }, 15000);
  }

  resendCode(): void {
    this.apiService.load({
      url: 'Verification/sendmailverificationcode?UserId=' + this.userDetails.id,
      method: 'POST',
      route: routeConstants.NFR
    }).toPromise().then((res) => {
      this.toastr.success('Code resent successfully');
      this.handleResend();
    }).catch((err) => {
      this.toastr.error('Unable to send');
    });
  }

  onSubmit(): void {
    this.loading = true;
    this.apiService.load({
      url: `Verification/isverificationcodevalid?Code=${this.form.code}&UserId=${this.userDetails.id}`,
      method: 'POST',
      route: routeConstants.NFR
    }).toPromise().then((res) => {
      console.log(res);
      if (res) {
        if (this.userDetails.user === 'Protegee') {
          this.router.navigateByUrl('/coach/');
        } else {
          this.router.navigateByUrl('/auth/overview');
        }
      } else {
        this.toastr.error('Invalid Code');
      }
      console.log(res);
    }).catch((err) => {
      this.toastr.error('Unable to Verify');
    }).finally(() => {
      this.loading = false;
    });
  }

  ngOnDestroy(): void {}

}
