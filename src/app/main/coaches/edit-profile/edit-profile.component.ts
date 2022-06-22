import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { routeConstants } from 'src/app/app-support/constants/core-constants';
import { AuthStorageService } from 'src/app/app-support/services/authorization/auth-storage.service';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';

@Component({
  selector: 'app-coach-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {

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
    this.toastr.info('Under Development');
    return;
    if (this.form.username.length < 6) {
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
      jobTitle: this.form.job_title,
      company: this.form.company,
      jobSummary: this.form.job_summary,
    };
    this.apiService.load({
      url: 'register/coach',
      method: 'POST',
      data: payload,
      route: routeConstants.AUTH
    }).toPromise().then((res) => {
      console.log(res);
    }).catch((err) => {
      if (err && err.length) {
        let errorMsg = '';
        err.map((item) => {
          errorMsg += `${item.description} `;
        });
        this.toastr.error(errorMsg);
        return;
      }
      this.toastr.error('Unable to register, please check your network connection and your details before retrying');
    }).finally(() => {
      this.loading = false;
    });
  }

  cancel(): void {
    this.router.navigateByUrl('/coach/profile');
  }

  ngOnDestroy(): void {}

}
