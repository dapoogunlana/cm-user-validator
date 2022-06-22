import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { dummyAvater, userDetail } from 'src/app/app-support/constants/dummy-constants';
import { AuthStorageService } from 'src/app/app-support/services/authorization/auth-storage.service';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';
import { UtilityService } from 'src/app/app-support/services/general/utility.service';

@Component({
  selector: 'app-coach-profile-old',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class CoachProfileOldComponent implements OnInit, OnDestroy {

  showCashToBankModal = false;
  showWalletHistoryModal = false;
  showVideo = false;
  userDetail: any = userDetail;
  avater = dummyAvater;

  constructor(
    private apiService: ApiLoaderService,
    private storage: AuthStorageService,
    private router: Router,
    private toastr: ToastrService,
    public utility: UtilityService,
  ) {}

  ngOnInit(): void {}

  openCashToBankDialogue(): void {
    this.showCashToBankModal = true;
  }

  openWalletHistoryDialogue(): void {
    this.showWalletHistoryModal = true;
  }

  closeCashToBankDialogue(e: any): void {
    this.showCashToBankModal = false;
  }

  closeWalletHistoryDialogue(e: any): void {
    this.showWalletHistoryModal = false;
  }

  openVideo(): void {
    this.showVideo = true;
  }

  closeVideo(): void {
    this.showVideo = false;
  }

  addAvailability(): void {
    this.toastr.info('Under Development');
  }

  removeAvailability(index): void {
    this.userDetail.availability.splice(index, 1);
  }

  ngOnDestroy(): void {}

}
