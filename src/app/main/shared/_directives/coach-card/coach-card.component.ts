import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { pricingPlanMapping } from 'src/app/app-support/constants/core-constants';
import { UtilityService } from 'src/app/app-support/services/general/utility.service';

@Component({
  selector: 'app-coach-card',
  templateUrl: './coach-card.component.html',
  styleUrls: ['./coach-card.component.scss']
})
export class CoachCardComponent implements OnInit, OnDestroy {

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
    this.cardData.coachPricingPlans = this.cardData.coachPricingPlans || [];
    this.cardData.coachPricingPlans = this.processPricingPlans(this.cardData.coachPricingPlans);
  }

  processRating(rating): string {
    return this.utility.calculateColoredStars(rating);
  }
  processPricingPlans(plans: any[]): any {
    const planString = [];
    plans.map((plan) => {
      const pickedPlan = pricingPlanMapping.find((item) => item.id === plan);
      if (pickedPlan) {
        planString.push(pickedPlan.planName);
      }
    });
    return pricingPlanMapping.map((item) => item.planName);
    return planString;
  }

  cardAction(): void {
    this.cardPayload.emit();
  }

  ngOnDestroy(): void {}

}
