import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { routeConstants } from 'src/app/app-support/constants/core-constants';
import { helpSections } from 'src/app/app-support/constants/dummy-marketing-constants';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';
import { SwitchService } from 'src/app/app-support/services/general/switch.service';

@Component({
  selector: 'app-faq-detail',
  templateUrl: './faq-detail.component.html',
  styleUrls: ['./faq-detail.component.scss']
})
export class FaqDetailComponent implements OnInit, OnDestroy {

  levels = ['Home', 'Getting started', 'Anyone'];
  helpSections = helpSections;
  contactModalpened = false;
  articleExpanded = false;
  articles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  constructor(
    public switchService: SwitchService
  ) {}


  ngOnInit(): void {
    scrollTo(0, 0);
    setTimeout(() => {
      this.switchService.hideMarketingHeader = true;
    }, 100);
  }

  pickArticle(id): void {
    this.articleExpanded = true;
  }

  openContactModal(): void {
    this.contactModalpened = true;
  }

  closeContactModal(): void {
    this.contactModalpened = false;
  }

  ngOnDestroy(): void {
    setTimeout(() => {
      this.switchService.hideMarketingHeader = false;
    }, 100);
  }

}