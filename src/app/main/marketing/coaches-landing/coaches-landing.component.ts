import { Component, OnInit, OnDestroy } from '@angular/core';
import { tutorsForCoaches, eventCards } from 'src/app/app-support/constants/dummy-constants';

@Component({
  selector: 'app-coaches-landing',
  templateUrl: './coaches-landing.component.html',
  styleUrls: ['./coaches-landing.component.scss']
})
export class MarketingCoachesLandingComponent implements OnInit, OnDestroy {

  tutors = tutorsForCoaches;
  videoToggle: boolean;

  constructor() { }

  ngOnInit(): void {}

  toggleVideo(entity?): void {
    if (entity) {
      this.videoToggle = true;
    } else {
      this.videoToggle = false;
    }
  }

  ngOnDestroy(): void {}

}
