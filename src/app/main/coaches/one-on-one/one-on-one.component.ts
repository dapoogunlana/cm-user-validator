import { Component, OnInit, OnDestroy } from '@angular/core';
import { userDetail } from 'src/app/app-support/constants/dummy-constants';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';
import { UtilityService } from 'src/app/app-support/services/general/utility.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { oneOnOneDetails } from 'src/app/app-support/constants/dummy-coach-constants';
import { TableLoaderService } from 'src/app/app-support/services/general/table-loader.service';
import { routeConstants } from 'src/app/app-support/constants/core-constants';
import { AuthStorageService } from 'src/app/app-support/services/authorization/auth-storage.service';

@Component({
  selector: 'app-coach-one-on-one',
  templateUrl: './one-on-one.component.html',
  styleUrls: ['./one-on-one.component.scss']
})
export class CoachOneOnOneComponent implements OnInit, OnDestroy {

  userDetails: any = {};
  activeTab = 'new';
  sessionDetailsLoaded = false;
  newSessions: any[] = [];
  upcomingessionsTableData = {
    headerRow: ['Dates', 'Name', 'Type', 'Client'],
    bodyRows: []
  }
  previousSessionsTableData = {
    headerRow: ['Dates', 'Name', 'Type', 'Client'],
    bodyRows: []
  }


  constructor(
    public utility: UtilityService,
    private apiService: ApiLoaderService,
    private router: Router,
    private toastr: ToastrService,
    public loaderService: TableLoaderService,
    public storageService: AuthStorageService,
  ) {
    this.userDetails = storageService.getObj('userDetails') || {};
  }

  ngOnInit(): void {
    this.getSessions();
  }

  switchTab(tab): void {
    this.activeTab = tab;
  }

  getSessions(): void {
    this.loaderService.setLoading();
    this.apiService.load({
      url: 'consultation/retrieve-expert-session',
      method: 'POST',
      data: {
        userId: this.userDetails.id
      },
      route: routeConstants.COACHV1
    }).toPromise().then((res) => {
      console.log(res);
      this.newSessions = res.newSession;
      this.setupUpcomingTableRows(res.upcomingSession);
      this.setupPreviousTableRows(res.previousSession);
    }).finally(() => {
      this.loaderService.setLoaded();
      this.sessionDetailsLoaded = true;
    });
  }

  setupUpcomingTableRows(data) {
    this.upcomingessionsTableData.bodyRows = data.map((item) => {
      return [
        item.date,
        `<div class="spread-info-front">
          <img src="./../../../../assets/images/new-coach-dashboard/one-on-one-icon-block.svg" width="60" />
          <a href="/coach/one-on-one/${item.id}"><span class="ml-3">${item.title}</span></a>
        </div>`,
        item.type,
        item.client
      ];
    });
  }

  setupPreviousTableRows(data) {
    this.previousSessionsTableData.bodyRows = data.map((item) => {
      return [
        item.date,
        `<div class="spread-info-front">
          <img src="./../../../../assets/images/new-coach-dashboard/one-on-one-icon-block.svg" width="60" />
          <a href="/coach/one-on-one/${item.id}"><span class="ml-3">${item.title}</span></a>
        </div>`,
        item.type,
        item.client
      ];
    });
  }

  rejectRequest(id): void {
    console.log(id);
    const digit = this.newSessions.indexOf(this.newSessions.find(item => item.id === id ));
    this.newSessions.splice(digit, 1);
  }

  acceptRequest(id): void {
    console.log(id);
    const digit = this.newSessions.indexOf(this.newSessions.find(item => item.id === id ));
    this.newSessions.splice(digit, 1);
  }

  ngOnDestroy(): void {}

}

