import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-marketing-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class MarketingFooterComponent implements OnInit, OnDestroy {

  @Input() canRegister: boolean;
  subscriptionResponse: string;
  subscriptionError: string;
  submitButton: string;
  subscription: any = {};

  constructor() {
    this.submitButton = 'Join Today';
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  subscribe(): void {
    this.submitButton = 'Submitting..';
    setTimeout(() => {
      this.submitButton = 'Subscribe';
      this.subscriptionError = 'Not connected to API';
    }, 3000);
  }

  clearFeedback() {
    this.subscriptionError = '';
    this.subscriptionResponse = '';
  }

}
