import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { tutors, eventCards } from 'src/app/app-support/constants/dummy-constants';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  providers: [NgbCarouselConfig]
})
export class MarketingLandingComponent implements OnInit, OnDestroy {

  search: any;
  topCoaches: any[] = tutors;
  domains: any[] = [];
  pricingPlans: any[] = [];
  UpcomingEvents: any[] = eventCards;

  constructor(
    private toastr: ToastrService,
    private config: NgbCarouselConfig,
    private apiService: ApiLoaderService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadtopCoaches();
    this.loadDomains();
    this.loadPricingPlans();
    this.loadUpcomingEvents();
  }

  runSearch(): void {
    this.router.navigateByUrl('/coach-list');
  }

  loadtopCoaches(): void {
    this.apiService.load({
      url: 'Coach/TopRatedCoaches/4',
    }).toPromise().then((res) => {
      this.topCoaches = res || [];
    });
  }

  loadDomains(): void {
    this.apiService.load({
      url: 'Configuration/AllTrendingDomains',
    }).toPromise().then((res) => {
      this.domains = res || [];
    });
  }

  loadPricingPlans(): void {
    this.apiService.load({
      url: 'Configuration/AllPricingPlans',
    }).toPromise().then((res) => {
      this.pricingPlans = res || [];
    });
  }

  loadUpcomingEvents(): void {
    this.apiService.load({
      url: 'Event/UpcommingEvents/4',
    }).toPromise().then((res) => {
      console.log(res);
      this.UpcomingEvents = res || [];
    });
  }

  ngOnDestroy(): void {}

}
