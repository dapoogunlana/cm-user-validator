import { Component, OnInit, OnDestroy } from '@angular/core';
import { userDetail } from 'src/app/app-support/constants/dummy-constants';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';
import { UtilityService } from 'src/app/app-support/services/general/utility.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { notificationData, notificationSettings } from 'src/app/app-support/constants/dummy-coach-constants';

@Component({
  selector: 'app-coach-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class CoachNotificationComponent implements OnInit, OnDestroy {

  userDetail: any = {};
  notificationsLoaded = false;
  notificationList = notificationData.notificationList;
  notificationSettings = notificationSettings;

  constructor(
    public utility: UtilityService,
    private apiService: ApiLoaderService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.userDetail = userDetail;
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    setTimeout(() => {
      // this.loaderService.setLoaded();
      this.notificationsLoaded = true;
    }, 1000);
  }

  switchActive(field): void {
    this.notificationSettings[field] =
    !this.notificationSettings[field];
  }

  ngOnDestroy(): void {}

}

