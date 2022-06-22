import { Component, OnInit, OnDestroy } from '@angular/core';
import { userDetail } from 'src/app/app-support/constants/dummy-constants';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';
import { UtilityService } from 'src/app/app-support/services/general/utility.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { inviteList } from 'src/app/app-support/constants/dummy-coach-constants';
import { TableLoaderService } from 'src/app/app-support/services/general/table-loader.service';


@Component({
  selector: 'app-coach-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class CoachInviteComponent implements OnInit, OnDestroy {

  userDetail: any = {};
  activeTab = 'newInvite';
  newNotification = false;
  notification: any = {};
  invitePayload: any = {}
  inviteDetailsLoaded = false;
  submitting = false;
  inviteTableData = {
    headerRow: ['Date', 'Email', 'Status'],
    bodyRows: []
  }

  constructor(
    public utility: UtilityService,
    private apiService: ApiLoaderService,
    private router: Router,
    private toastr: ToastrService,
    public loaderService: TableLoaderService,
  ) {
    this.userDetail = userDetail;
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    setTimeout(() => {
      this.loaderService.setLoaded();
      this.inviteDetailsLoaded = true;
      this.newNotification = true;
      this.notification = {
        message: 'Ask CDCR San Quintin State Prison 2008. We installed Purex dispensers throughout the prison to combat ',
      }
      this.setupInviteTableRows(inviteList);
    }, 1000);
  }

  switchTab(tab): void {
    this.activeTab = tab;
  }
  
  closeNotification(): void {
    this.newNotification = false;
  }

  setupInviteTableRows(data) {
    this.inviteTableData.bodyRows = data.map((item) => {
      return [
        item.date,
        item.email,
        this.sortStatus(item.status),
        item.type,
        item.registration
      ];
    });
  }

  sortStatus(stat: string): any {
    if(!stat) {
      return '';
    };
    switch (stat.toLocaleLowerCase()) {
      case 'successful':
        return `<div class="success-capsule">Success</div>`;
      case 'pending':
        return `<div class="pending-capsule">Pending</div>`;
      case 'failed':
        return `<div class="fail-capsule">&nbsp;Failed&nbsp;</div>`;
    }
  }

  sendInvite(): void {
    console.log(this.invitePayload);
    this.submitting = true;
    setTimeout(() => {
      this.submitting = false;
      this.invitePayload = {}
    }, 3000);
  }
 
  ngOnDestroy(): void {}

}

