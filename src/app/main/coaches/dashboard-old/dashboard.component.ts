import { Component, OnInit, OnDestroy } from '@angular/core';
import { availableDates, dummyAvater, tutorCards, userDetail } from 'src/app/app-support/constants/dummy-constants';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';
import { FilterService } from 'src/app/app-support/services/general/filter.service';
import { UtilityService } from 'src/app/app-support/services/general/utility.service';
import { Chart } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coach-dashboard-old',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class CoachDashboardOldComponent implements OnInit, OnDestroy {

  coachList: any = [];
  avater = dummyAvater;
  userDetail: any = {};
  recentReviews: any[];
  recentUpdate: any[];
  pageNumber = 1;
  pageSize = 10;
  loaded = false;
  filters = {};
  randomId = 'add' + Math.round(Math.random() * 10000000000);
  availableDates = availableDates;

  constructor(
    public utility: UtilityService,
    private filterService: FilterService,
    private apiService: ApiLoaderService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.userDetail = userDetail;
    this.recentReviews = [
      {
        image: './../../../../assets/images/shared/user-5.jpg',
        name: 'James Peddigo',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
      },
      {
        image: './../../../../assets/images/shared/user-5.jpg',
        name: 'Bimbo Awolokun',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
      },
    ];
    this.recentUpdate = [
      {
        image: './../../../../assets/images/shared/user-5.jpg',
        name: 'James Peddigo',
        time: '12:00 - 2:00PM GMT',
        type: 'Private Session'
      },
      {
        image: './../../../../assets/images/shared/user-5.jpg',
        name: 'James Peddigo',
        time: '12:00 - 2:00PM GMT',
        type: 'Private Session'
      },
    ];
  }

  ngOnInit(): void {
    this.loadTutors();
    setTimeout(() => {
      this.loadSessionsAndEventHistory();
    }, 200);
  }

  loadTutors(): void {
    this.loaded = false;
    const params = this.filterService.processQueries({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      ...this.filters,
    });
    this.loaded = false;
    this.apiService.load({
      url: 'Coach/Coaches' + params,
      method: 'POST',
      route: 'ADMIN',
      data: {}
    }).toPromise().then((res) => {
      console.log(res);
      this.coachList = res.coaches || [];
    }).finally(() => {
      this.loaded = true;
    });
  }
  loadSessionsAndEventHistory(): void {
    //  Exacute chart
    console.log(this.randomId);
    const myChart = new Chart(document.getElementById(this.randomId), {
      type: 'bar',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: 'Sessions',
            fill: 'true',
            backgroundColor: '#22215B',
            data: [10, 21, 22, 23]
          },
          {
            label: 'Events',
            fill: 'true',
            backgroundColor: '#F7A02C',
            data: [17, 32, 33, 34]
          }
        ]
      },
      options: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true
          }
        },
        animation: {
          animateRotate: true,
          animateScale: true
        },
        rotation: 0,
        scales: {
          yAxes: [{
            beginAtZero: true,
            // show
            gridLines: {
              display: false
            }
          }],
          xAxes: [{
            // beginAtZero: true,
            // show
            gridLines: {
              display: false
            }
          }],
        }
      }
    });
  }

  createNewEvent(): void {
    this.router.navigateByUrl('coach/create-event');
    // this.toastr.info('Under Development');
  }

  ngOnDestroy(): void {}

}
