import { Component, OnInit, OnDestroy } from '@angular/core';
import { userDetail } from 'src/app/app-support/constants/dummy-constants';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';
import { UtilityService } from 'src/app/app-support/services/general/utility.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { impactDetails } from 'src/app/app-support/constants/dummy-coach-constants';
import { TableLoaderService } from 'src/app/app-support/services/general/table-loader.service';
import { routeConstants } from 'src/app/app-support/constants/core-constants';
import { AuthStorageService } from 'src/app/app-support/services/authorization/auth-storage.service';

@Component({
  selector: 'app-coach-impact',
  templateUrl: './impact.component.html',
  styleUrls: ['./impact.component.scss']
})
export class CoachImpactComponent implements OnInit, OnDestroy {

  userDetails: any = {};
  impactDetails: any = {};
  impactDetailsLoaded = false
  tableData = {
    headerRow: ['Type', 'Consultation', 'Partispants', 'Country Reach', 'Total Earnings'],
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


  fetchData(): void {
    setTimeout(() => {
      this.loaderService.setLoaded();
      this.impactDetailsLoaded = true;
      this.setupTableRows(impactDetails.sessionList);
      console.log({tableData: this.tableData});
    }, 1000);
  }

  getSessions(): void {
    this.loaderService.setLoading();
    this.apiService.load({
      url: 'consultation/retrieve-expert-impact',
      method: 'POST',
      data: {
        userId: this.userDetails.id
      },
      route: routeConstants.COACHV1
    }).toPromise().then((res) => {
      console.log(res);
      this.impactDetails = res;
      this.setupTableRows(res.sessionList);
    }).finally(() => {
      this.loaderService.setLoaded();
      this.impactDetailsLoaded = true;
    });
  }

  setupTableRows(data) {
    this.tableData.bodyRows = data.map((item) => {
      return [
        item.type,
        item.consultations,
        item.participants,
        item.countryReach,
        item.totalEarnings,
      ];
    });
  }

  ngOnDestroy(): void {}

}

