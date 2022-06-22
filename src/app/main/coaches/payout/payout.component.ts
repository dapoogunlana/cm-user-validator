import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { userDetail } from 'src/app/app-support/constants/dummy-constants';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';
import { UtilityService } from 'src/app/app-support/services/general/utility.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { addPayoutAccountData, payoutDetails } from 'src/app/app-support/constants/dummy-coach-constants';
import { LineChart } from 'chart.js';
import * as Chart from 'chart.js';
import { TableLoaderService } from 'src/app/app-support/services/general/table-loader.service';
import { AuthStorageService } from 'src/app/app-support/services/authorization/auth-storage.service';
import { routeConstants } from 'src/app/app-support/constants/core-constants';

@Component({
  selector: 'app-coach-payout',
  templateUrl: './payout.component.html',
  styleUrls: ['./payout.component.scss']
})
export class CoachPayoutComponent implements OnInit, OnDestroy {

  @ViewChild('lineCanvas', {static: false}) lineCanvas: ElementRef;
  lineChart: any;

  userDetails: any = {};
  payoutDataLoaded = false;
  newNotification = false;
  notification: any = {};
  pageState = 0;
  accountType = 'personal';
  accountData: any = addPayoutAccountData;
  accountDataLoaded = false;
  payoutDetails: any = payoutDetails;
  balanceTableData = {
    headerRow: ['Dates', 'Consultation', 'Type', 'Attendance', 'Revenue'],
    bodyRows: []
  }
  payoutsTableData = {
    headerRow: ['Dates', 'Status', 'Charges', 'Refund', 'Fees', 'Total'],
    bodyRows: []
  }
  countryList: any[] = [];
  countryLoadingMessage = 'Loading....'

  constructor(
    public utility: UtilityService,
    private apiService: ApiLoaderService,
    private router: Router,
    public loaderService: TableLoaderService,
    public storageService: AuthStorageService,
  ) {
    this.userDetails = storageService.getObj('userDetails') || {};
  }

  ngOnInit(): void {
    this.getPayouts();
    this.getPayoutAccount();
    this.loadCountries();
  }

  ngAfterViewInit(): void {
    // this.lineChartMethod();
  }

  loadCountries(): void {
    this.apiService.load({
      url: 'Configuration/AllCountries',
    }).toPromise().then((res) => {
      this.countryList = res || [];
      this.countryLoadingMessage = 'Choose Country';
    }).catch((err) => {
      this.countryLoadingMessage = 'Unable to load';
    });
  }

  getPayouts(): void {
    this.loaderService.setLoading();
    this.apiService.load({
      url: 'PayOut/get-payout-data',
      method: 'POST',
      data: {
        userId: this.userDetails.id
      },
      route: routeConstants.PAYMENT
    }).toPromise().then((res) => {
      console.log(res);
      this.payoutDetails = res;
      this.setupBalanceTableRows(this.payoutDetails.balanceBreakdown);
      this.setupPayoutTableRows(this.payoutDetails.totalPayoutBreakdown);
      // this.lineChartMethod();
    }).finally(() => {
      this.loaderService.setLoaded();
      this.payoutDataLoaded = true;
    });
  }

  getPayoutAccount(): void {
    this.accountDataLoaded = false;
    this.apiService.load({
      url: 'PayOut/get-payout-account',
      method: 'POST',
      data: {
        userId: this.userDetails.id
      },
      route: routeConstants.PAYMENT
    }).toPromise().then((res) => {
      console.log(res);
      this.accountData = res;
    }).finally(() => {
      this.accountDataLoaded = true;
    });
  }

  fetchData(): void {
    setTimeout(() => {
      this.payoutDataLoaded = true;
      this.newNotification = true;
      this.notification = {
        message: `Ask CDCR San Quintin State Prison 2008. We installed Purex dispensers throughout the prison to combat diseases…and 
        it was a Roaring Success (as in Roaring Drunk) I mean we had Long lines of prisoners fist fighting to use them.`,
      }
    }, 1000);
  }

  setupBalanceTableRows(data) {
    this.balanceTableData.bodyRows = data.map((item) => {
      return [
        item.dates,
        item.consultation,
        item.type,
        item.attendance,
        item.revenue
      ];
    });
  }

  setupPayoutTableRows(data) {
    this.payoutsTableData.bodyRows = data.map((item) => {
      return [
        item.dates,
        this.utility.sortStatusCapsule(item.status),
        item.charges,
        item.refund,
        item.fees,
        item.total
      ];
    });
  }
  
  closeNotification(): void {
    this.newNotification = false;
  }

  changePageState(state): void {
    console.log({state});
    this.pageState = state;
  }

  switchAccount(type): void {
    this.accountData.accountOwnershipType = type;
  }

  updateAccountDetails(): void {
    console.log(this.accountData);
    this.changePageState(2);
  }

  openWithdrawalModal():void {
    console.log('Opening withdrawal modal');
  }

  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
        datasets: [
          {
            label: 'Sell per week',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
            spanGaps: false,
          }
        ]
      }
    });
  }

  ngOnDestroy(): void {}

}

