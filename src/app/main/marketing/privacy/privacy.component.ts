import { Component, OnInit, OnDestroy } from '@angular/core';
import { SwitchService } from 'src/app/app-support/services/general/switch.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit, OnDestroy {

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