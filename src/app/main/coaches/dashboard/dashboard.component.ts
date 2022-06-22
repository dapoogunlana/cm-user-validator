import { Component, OnInit, OnDestroy } from '@angular/core';
import { availableDates, dummyAvater, tutorCards } from 'src/app/app-support/constants/dummy-constants';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';
import { FilterService } from 'src/app/app-support/services/general/filter.service';
import { UtilityService } from 'src/app/app-support/services/general/utility.service';
import { Chart } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { coachInfo } from 'src/app/app-support/constants/dummy-coach-constants';
import { routeConstants } from 'src/app/app-support/constants/core-constants';
import { AuthStorageService } from 'src/app/app-support/services/authorization/auth-storage.service';

@Component({
  selector: 'app-coach-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class CoachDashboardComponent implements OnInit, OnDestroy {

  showSidebar = false;
  avater = dummyAvater;
  userDetails: any = {};
  coachInfo = coachInfo;

  constructor(
    public utility: UtilityService,
    private filterService: FilterService,
    private apiService: ApiLoaderService,
    private router: Router,
    private toastr: ToastrService,
    public storageService: AuthStorageService,
  ) {
    this.userDetails = storageService.getObj('userDetails') || {};
  }

  ngOnInit(): void {
    // this.getData();
  }

  openSideBar(): void {
    this.showSidebar = true;
    console.log('Showing');
  }

  hideSideBar(): void {
    this.showSidebar = false;
    console.log('Hiding');
  }


  getData(): void {
    this.apiService.load({
      url: 'user-data',
      method: 'POST',
      data: {
        userId: this.userDetails.id
      },
      route: routeConstants.AUTHV1
    }).toPromise().then((res) => {
      console.log(res);
    });
  }

  loadSessionsAndEventHistory(): void {}

  ngOnDestroy(): void {}

}

