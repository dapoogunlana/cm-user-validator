import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { routeConstants } from 'src/app/app-support/constants/core-constants';
import { insightList } from 'src/app/app-support/constants/dummy-marketing-constants';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';
import { SwitchService } from 'src/app/app-support/services/general/switch.service';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss']
})
export class InsightsComponent implements OnInit, OnDestroy {

  domainSectWidth = 0;
  quotes: string[] = [];
  activeQuote = '';
  switchInterval: any;
  insightList = insightList;
  loadingArticles = false;

  constructor(
    private toastr: ToastrService,
    private apiService: ApiLoaderService,
    private router: Router,
    public switchService: SwitchService
  ) {}


  ngOnInit(): void {
    scrollTo(0, 0);
    setTimeout(() => {
      this.switchService.hideMarketingHeader = true;
    }, 100);
    this.loadUtilities();
  }

  loadUtilities(): void {
    this.apiService.load({
      url: 'Configuration/landing-page-objects',
      route: routeConstants.MARKETINGV1
    }).toPromise().then((res) => {
      console.log(res);
      this.quotes = res.landingPageScrollableSubTexts;
      this.quoteSwitch();
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
    }, 2500);
  }

  loadMoreArticles(): void {
    this.loadingArticles = true;
    setTimeout(() => {
      this.loadingArticles = false;
    }, 2000);
  }

  ngOnDestroy(): void {
    setTimeout(() => {
      this.switchService.hideMarketingHeader = false;
    }, 100);
    clearInterval(this.switchInterval);
  }

}
