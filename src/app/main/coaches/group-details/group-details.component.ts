import { Component, OnInit, OnDestroy } from '@angular/core';
import { messages, userDetail } from 'src/app/app-support/constants/dummy-constants';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';
import { UtilityService } from 'src/app/app-support/services/general/utility.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { groupSessionDetail } from 'src/app/app-support/constants/dummy-coach-constants';
import { TableLoaderService } from 'src/app/app-support/services/general/table-loader.service';

@Component({
  selector: 'app-coach-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss']
})
export class CoachGroupDetailsComponent implements OnInit, OnDestroy {

  userDetail: any = {};
  activeTab = 'description';
  messages = messages;
  sessionDetailsLoaded = false;
  groupSessionDetail = groupSessionDetail;
  newSessions: any[] = [];


  constructor(
    public utility: UtilityService,
    private apiService: ApiLoaderService,
    private router: Router,
    private toastr: ToastrService,
    public loaderService: TableLoaderService
  ) {
    this.userDetail = userDetail;
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    setTimeout(() => {
      this.loaderService.setLoaded();
      this.sessionDetailsLoaded = true;
    }, 1000);
  }

  switchTab(tab): void {
    this.activeTab = tab;
  }

  goback(): void {
    window.history.back();
  }

  ngOnDestroy(): void {}

}

