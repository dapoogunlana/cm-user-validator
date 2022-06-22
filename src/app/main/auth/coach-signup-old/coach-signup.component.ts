import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { routeConstants } from 'src/app/app-support/constants/core-constants';
import { AuthStorageService } from 'src/app/app-support/services/authorization/auth-storage.service';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';

@Component({
  selector: 'app-coach-signup-old',
  templateUrl: './coach-signup.component.html',
  styleUrls: ['./coach-signup.component.scss']
})
export class OldCoachSignupComponent implements OnInit, OnDestroy {

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

  onSubmit(): void {
    if (this.form.email.length < 6) {
      this.toastr.error('Username can not be less than 6 characters');
      return;
    }
    if (this.form.password.length < 6) {
      this.toastr.error('Password can not be less than 6 characters');
      return;
    }
    if (this.form.password !== this.form.password2) {
      this.toastr.error('Passwords do not match');
      return;
    }
    this.loading = true;
    const payload = {
      firstName: this.form.first_name,
      lastName: this.form.last_name,
      email: this.form.email,
      password: this.form.password,
      confirmPassword: this.form.password2,
      username: this.form.email
    };
    this.apiService.load({
      url: 'register/coach',
      method: 'POST',
      data: payload,
      route: routeConstants.AUTH
    }).toPromise().then((res) => {
      this.storage.saveObj('userDetails', res);
      this.storage.saveString('token', res.authToken);
      this.sendMail(res.id);
    }).catch((err) => {
      this.toastr.error(err.error.message || 'Unable to register');
      // if (err && err.length) {
      //   let errorMsg = '';
      //   err.map((item) => {
      //     errorMsg += `${item.description} `;
      //   });
      //   this.toastr.error(errorMsg);
      //   return;
      // }
      // this.toastr.error('Unable to register, please check your network connection and your details before retrying');
      this.loading = false;
    }).finally(() => {
    });
  }

  sendMail(id): void {
    this.apiService.load({
      url: 'Verification/sendmailverificationcode?UserId=' + id,
      method: 'POST',
      route: routeConstants.NFR
    }).toPromise().finally(() => {
      this.loading = false;
      this.registered = true;
    });
  }

  ngOnDestroy(): void {}

}
