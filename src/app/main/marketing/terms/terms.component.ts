import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { routeConstants } from 'src/app/app-support/constants/core-constants';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';
import { SwitchService } from 'src/app/app-support/services/general/switch.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit, OnDestroy {

  constructor(
    public switchService: SwitchService
  ) {}


  ngOnInit(): void {
    scrollTo(0, 0);
    setTimeout(() => {
      this.switchService.hideMarketingHeader = true;
    }, 100);
  }

  ngOnDestroy(): void {
    setTimeout(() => {
      this.switchService.hideMarketingHeader = false;
    }, 100);
  }

}
