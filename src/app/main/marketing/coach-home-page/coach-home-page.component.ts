import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { routeConstants } from 'src/app/app-support/constants/core-constants';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';
import { SwitchService } from 'src/app/app-support/services/general/switch.service';

@Component({
  selector: 'app-coach-home-page',
  templateUrl: './coach-home-page.component.html',
  styleUrls: ['./coach-home-page.component.scss']
})
export class CoachHomePageComponent implements OnInit, OnDestroy {

  domainSectWidth = 0;
  quotes: string[] = [];
  activeQuote = '';
  switchInterval: any;
  domainList : any[] = [];
  sessionDetails: any[] = [];
  subjectMatterCompanies: any[] = [];
  domainSize: number;

  constructor(
    private toastr: ToastrService,
    private apiService: ApiLoaderService,
    private router: Router,
    public switchService: SwitchService
  ) {}


  ngOnInit(): void {
    setTimeout(() => {
      this.switchService.hideMarketingHeader = true;
    }, 100);
    // this.calculateWidth();
    this.loadUtilities();
  }

  calculateWidth(count = 4): void {
    let size;
    if (window.innerWidth > 770) {
      this.domainSize = 300;
    } else {
      this.domainSize = 150;
    }
    this.domainSectWidth = this.domainSize * count;
  }

  loadUtilities(): void {
    this.apiService.load({
      url: 'Configuration/landing-page-objects',
      route: routeConstants.MARKETINGV1
    }).toPromise().then((res) => {
      console.log(res);
      this.subjectMatterCompanies = res.subjectMatterExpertOrganizations;

      this.quotes = res.landingPageScrollableSubTexts;
      this.quoteSwitch();

      this.domainList = res.serviceDomainCategories;
      this.calculateWidth(this.domainList.length);

      this.sessionDetails = res.sessionPricings;
    }).catch((err) => {
      console.log(err);
    });
  }

  quoteSwitch() {
    this.switchInterval = setInterval(() => {
      const activeQuoteIndex = this.quotes.indexOf(this.activeQuote);
      if ((activeQuoteIndex + 1) < this.quotes.length) {
        this.activeQuote = this.quotes[activeQuoteIndex + 1];
      } else {
        this.activeQuote = this.quotes[0];
      }
    }, 4000);
  }

  scrollLeft(): void {
    const container = document.getElementById('domain-holder-container');
    const domainHolder = document.getElementById('domain-holder');
    if (domainHolder.clientWidth <= container.clientWidth) {
      return;
    }
    const newPosition = (container.scrollLeft - this.domainSize) <= 0 ? 0 : (container.scrollLeft - this.domainSize);
    container.scroll({
      top: 0,
      left: newPosition,
      behavior: 'smooth'
    });
  }

  scrollRight(): void {
    const container = document.getElementById('domain-holder-container');
    const domainHolder = document.getElementById('domain-holder');
    if (domainHolder.clientWidth <= container.clientWidth) {
      return;
    }
    const maxOffset = domainHolder.clientWidth - container.clientWidth;
    const newPosition = (container.scrollLeft + this.domainSize) >= maxOffset ? maxOffset : (container.scrollLeft + this.domainSize);
    container.scroll({
      top: 0,
      left: newPosition,
      behavior: 'smooth'
    });
  }

  ngOnDestroy(): void {
    setTimeout(() => {
      this.switchService.hideMarketingHeader = false;
    }, 100);
    clearInterval(this.switchInterval);
  }

}
