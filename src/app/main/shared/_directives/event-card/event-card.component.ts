import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { UtilityService } from 'src/app/app-support/services/general/utility.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit, OnDestroy {

  @Input() cardData: any;
  @Output() cardPayload: EventEmitter<any> = new EventEmitter<any>();
  isMobile: boolean;

  constructor(public utility: UtilityService) {
    if (window.innerWidth > 750) {
      this.isMobile = false;
    } else {
      this.isMobile = true;
    }
  }

  ngOnInit(): void {
    // console.log(this.cardData);
  }

  processRating(rating): string {
    return this.utility.calculateColoredStars(rating);
  }

  cardAction(): void {
    this.cardPayload.emit();
  }

  ngOnDestroy(): void {}

}
