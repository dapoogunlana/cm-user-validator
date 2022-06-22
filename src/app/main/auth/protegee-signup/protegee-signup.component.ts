import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { routeConstants } from 'src/app/app-support/constants/core-constants';
import { AuthStorageService } from 'src/app/app-support/services/authorization/auth-storage.service';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';

@Component({
  selector: 'app-protegee-signup',
  templateUrl: './protegee-signup.component.html',
  styleUrls: ['./protegee-signup.component.scss']
})
export class ProtegeeSignupComponent implements OnInit, OnDestroy {

  form: any = {};
  loading = false;
  passwordType = 'password';
  passwordVisible = false;

  constructor(
    private apiService: ApiLoaderService,
    private storage: AuthStorageService,
    private router: Router,
    private toastr: ToastrService
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
    if (this.form.password !== this.form.password2) {
      this.toastr.error('Passwords do not match');
      return;
    }
    console.log('Submitting now');
    this.loading = true;
    this.apiService.load({
      url: 'register/protegee',
      method: 'POST',
      data: {
        firstName: this.form.first_name,
        lastName: this.form.last_name,
        email: this.form.email,
        password: this.form.password,
        confirmPassword: this.form.password2,
        username: this.form.email,
      },
      route: routeConstants.AUTH
    }).toPromise().then((res) => {
      this.storage.saveObj('userDetails', res);
      this.storage.saveString('token', res.authToken);
      this.toastr.success('Successfully Registered');
      this.router.navigateByUrl('/protegee/');
      // if (res.userRole === 'protegee') {
      //   this.router.navigateByUrl('/coach/');
      // } else {
      //   this.router.navigateByUrl('/protegee/');
      // }
      // console.log(res);
    }).catch((err) => {
      console.log(err);
      this.toastr.error(err.error.message || 'Unable to register');
    }).finally(() => {
      this.loading = false;
    });
  }

  ngOnDestroy(): void {}

}
