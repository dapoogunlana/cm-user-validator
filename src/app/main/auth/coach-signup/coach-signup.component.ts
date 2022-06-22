import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { routeConstants } from 'src/app/app-support/constants/core-constants';
import { AuthStorageService } from 'src/app/app-support/services/authorization/auth-storage.service';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';

@Component({
  selector: 'app-coach-signup',
  templateUrl: './coach-signup.component.html',
  styleUrls: ['./coach-signup.component.scss']
})
export class CoachSignupComponent implements OnInit, OnDestroy {

  form: any = {};
  loading = false;
  passwordType = 'password';
  passwordVisible = false;
  registered = false;

  constructor(
    private apiService: ApiLoaderService,
    private storage: AuthStorageService,
    private router: Router,
    private toastr: ToastrService,
    public storageService: AuthStorageService,
  ) { }

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
  // https://www.linkedin.com/in/dapo-paul-ogunlana-517618106/
  onSubmit(): void {
    if (this.form.email.length < 6) {
      this.toastr.error('Email can not be less than 6 characters');
      return;
    }
    if (this.form.linkedInProfileUrl.indexOf('https://www.linkedin.com/') === -1) {
      // Temporarily allow other links
      // this.toastr.error('Invalid link, please enter a valid linked in profile link (url)');
      // return;
    }
    this.loading = true;
    const payload = {
      firstName: this.form.first_name,
      lastName: this.form.last_name,
      email: this.form.email,
      coachProfileUrl: this.form.linkedInProfileUrl,
    };
    this.apiService.load({
      url: 'invitation/coach',
      method: 'POST',
      data: payload,
      route: routeConstants.AUTH
    }).toPromise().then((res) => {
      this.storage.saveObj('userDetails', {
        email: payload.email
      });
      // this.storage.saveString('token', res.authToken);
      this.loading = false;
      this.registered = true;
      this.toastr.success(res.message);
      // this.sendMail(res.id);
    }).catch((err) => {
      this.toastr.error(err.error.message || 'Unable to register');
      this.loading = false;
    }).finally(() => {
    });
  }

  sendMail(id): void {
    this.apiService.load({
      url: 'invitation/send-verification-code',
      method: 'POST',
      route: routeConstants.AUTH,
      data: {
        emailAdress: this.form.email
      }
    }).toPromise().finally(() => {
      this.loading = false;
      this.registered = true;
    });
  }

  ngOnDestroy(): void {}

}
