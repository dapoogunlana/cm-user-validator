import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { routeConstants } from 'src/app/app-support/constants/core-constants';
import { AuthStorageService } from 'src/app/app-support/services/authorization/auth-storage.service';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit, OnDestroy {

  form: any = {};
  loading = false;
  passwordType = 'password';
  passwordVisible = false;

  constructor(
    private apiService: ApiLoaderService,
    private storage: AuthStorageService,
    private router: Router,
    public storageService: AuthStorageService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.storage.redirectLoggedIn();
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

  onSubmit(): void {
    this.loading = true;
    this.apiService.load({
      url: 'Auth/login',
      method: 'POST',
      data: {
        username: this.form.username,
        password: this.form.password,
      },
      route: routeConstants.AUTH
    }).toPromise().then((res) => {
      this.storage.saveObj('userDetails', res);
      this.storage.saveString('token', res.authToken);
      this.loading = false;
      const override = true;
      if (res.userRole === 'coach') {
        if (!res.isRegistrationApproved) {
          this.router.navigateByUrl('/auth/confirm-email');
          this.storage.removeAny('userDetails');
          this.storage.removeAny('token');
          return;
        }
        if (res.isRegistrationCompleted) {
          this.router.navigateByUrl('/coach');
          return;
        } else {
          this.router.navigateByUrl('/auth/overview');
          return;
        }
      }
      if (res.userRole === 'protegee') {
        this.router.navigateByUrl('/protegee');
      }
    }).catch((err) => {
      this.loading = false;
      this.toastr.error(err.error.message || 'Unable to log in');
    }).finally(() => {
      this.loading = false;
    });
  }

  ngOnDestroy(): void {}

}
