import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { descisionConstants, routeConstants } from 'src/app/app-support/constants/core-constants';
import { AuthStorageService } from 'src/app/app-support/services/authorization/auth-storage.service';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';

@Component({
  selector: 'app-invite-verification',
  templateUrl: './invite-verification.component.html',
  styleUrls: ['./invite-verification.component.scss']
})
export class InviteVerificationComponent implements OnInit, OnDestroy {

  passwordType = 'password';
  descisionConstants = descisionConstants;
  verificationStatus = this.descisionConstants.pending;
  serverMessage = {
    head: '',
    body: ''
  };
  invitationId: any;

  constructor(
    private apiService: ApiLoaderService,
    private storage: AuthStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.invitationId = this.route.snapshot.queryParams.uid;
    if (this.invitationId) {
      this.verify();
    } else {
      this.verificationStatus = this.descisionConstants.failed;
      this.serverMessage.head = 'Unable To Verify';
      this.serverMessage.body =
        'Something is wrong with your invitation link, please click the link again or copy it and paste it in your browser';
    }
  }

  verify(): void {
    this.apiService.load({
      url: 'invitation/validate-approval',
      method: 'POST',
      route: routeConstants.AUTH,
      data: {
        invitationId: this.invitationId,
      }
    }).toPromise().then((res) => {
      console.log(res);
      if (res.status === 'approved') {
        this.storage.saveString('invitationId', this.invitationId);
        this.storage.saveObj('userDetails', res);
        this.router.navigateByUrl('/auth/choose-password');
      } else {
        this.serverMessage.head = 'Invalid';
        this.serverMessage.body = 'Invalid link. please verify your invitation link and retry';
        this.verificationStatus = descisionConstants.failed;
      }
      return;
      this.storage.saveObj('userDetails', res.data);
      this.storage.saveString('token', res.data.token);
      this.verificationStatus = descisionConstants.successful;
      if (res.data.user === 'Coach') {
        this.router.navigateByUrl('/coach');
      } else {
        this.router.navigateByUrl('/protegee');
      }
      console.log(res);
    }).catch((err) => {
      console.log(err);
      this.serverMessage.head = 'Verification Failed';
      this.serverMessage.body = err.response || 'Verification failed. please refresh the page or return home';
      this.verificationStatus = descisionConstants.failed;
    });
  }

  ngOnDestroy(): void {}

}
