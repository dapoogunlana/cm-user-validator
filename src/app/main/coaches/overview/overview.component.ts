import { Component, OnInit, OnDestroy } from '@angular/core';
import { userDetail } from 'src/app/app-support/constants/dummy-constants';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';
import { UtilityService } from 'src/app/app-support/services/general/utility.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { overviewDetails } from 'src/app/app-support/constants/dummy-coach-constants';
import { TableLoaderService } from 'src/app/app-support/services/general/table-loader.service';
import { routeConstants } from 'src/app/app-support/constants/core-constants';
import { AuthStorageService } from 'src/app/app-support/services/authorization/auth-storage.service';

@Component({
  selector: 'app-coach-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class CoachOverviewComponent implements OnInit, OnDestroy {

  userDetails: any = {};
  overviewDetails: any = {};
  tableData = {
    headerRow: ['Name', 'Type', 'Dates', 'Registration'],
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
    // this.fetchData();
    console.log(this.userDetails);
    this.getData();
  }

  createNewEvent(): void {
    this.router.navigateByUrl('coach/group');
  }

  fetchData(): void {
    setTimeout(() => {
      this.loaderService.setLoaded();
      this.setupTableRows(overviewDetails.upcomingConsultations);
    }, 1000);
  }


  getData(): void {
    this.loaderService.setLoading();
    this.apiService.load({
      url: 'consultation/expert-upcomming-consultations',
      method: 'POST',
      data: {
        userId: this.userDetails.id
      },
      route: routeConstants.COACHV1
    }).toPromise().then((res) => {
      console.log(res);
      this.overviewDetails = res.consultationStatistics;
      this.setupTableRows(res.upComingConsultations);
    }).finally(() => {
      this.loaderService.setLoaded();
    });
  }



  setupTableRows(data) {
    this.tableData.bodyRows = data.map((item) => {
      return [
        `<div class="spread-info-front">
          ${
            item.image ? `<img src="${ item.image }" alt="" class="mr-3 rad-10" width="50">` :
            `<img src="./../../../../assets/images/new-coach-dashboard/overview-table-img1.png" alt="" class="mr-3 rad-10" width="50">`
          }
          <p class="mb-0">${ item.name }</p>
        </div>`,
        item.type,
        item.date,
        item.registration
      ];
    });
  }

  ngOnDestroy(): void {}

}

