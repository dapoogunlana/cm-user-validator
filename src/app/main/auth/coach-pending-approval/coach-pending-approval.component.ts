import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStorageService } from 'src/app/app-support/services/authorization/auth-storage.service';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';

@Component({
  selector: 'app-coach-pending-approval',
  templateUrl: './coach-pending-approval.component.html',
  styleUrls: ['./coach-pending-approval.component.scss']
})
export class CoachPendingApprovalComponent implements OnInit, OnDestroy {

  form: any = {};
  userEmail: string;
  loading = false;
  passwordType = 'password';
  passwordVisible = false;

  constructor(private apiService: ApiLoaderService, private storage: AuthStorageService, private router: Router) {
    this.userEmail = 'dapoogunlana@gmail.com';
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
      this.router.navigateByUrl('/auth/overview');
    });
  }

  ngOnDestroy(): void {}

}
