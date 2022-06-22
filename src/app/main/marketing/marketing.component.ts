import { Component, OnInit, OnChanges } from '@angular/core';
import { SwitchService } from 'src/app/app-support/services/general/switch.service';

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.scss']
})
export class MarketingComponent implements OnInit, OnChanges {
  title = 'cm-app';
  canRegister: boolean;

  constructor(public switchService: SwitchService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    console.log('change');
  }

  switchCanRegister(ev): void {
    if (ev) {
      this.canRegister = true;
    } else {
      this.canRegister = false;
    }
  }

  switchLayoutAttachment(): void {
    console.log('Router Change');
  }
}
