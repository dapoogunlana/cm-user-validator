import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { UtilityService } from 'src/app/app-support/services/general/utility.service';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements OnInit, OnDestroy {

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

  ngOnInit(): void {console.log(this.cardData); }

  processRating(rating): string {
    return this.utility.calculateColoredStars(rating);
  }

  cardAction(): void {
    this.cardPayload.emit();
  }

  ngOnDestroy(): void {}

}
