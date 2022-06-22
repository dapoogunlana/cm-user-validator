
import { NgModule } from '@angular/core';

import { MarketingRoutingModule } from './marketing-routing.module';
import { MarketingComponent } from './marketing.component';
import { MarketingLandingComponent } from './landing/landing.component';
import { MarketingCoachesLandingComponent } from './coaches-landing/coaches-landing.component';
import { SharedModule } from '../shared/shared.module';
import { MarketingHeaderComponent } from './_Layout-Components/header/header.component';
import { MarketingFooterComponent } from './_Layout-Components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { FindCoachComponent } from './find-coach/find-coach.component';
import { OpenEventsComponent } from './open-events/open-events.component';
import { CoachHomePageComponent } from './coach-home-page/coach-home-page.component';
import { FaqComponent } from './faq/faq.component';
import { InsightsComponent } from './insights/insights.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { InsightDetailComponent } from './insight-detail/insight-detail.component';
import { FaqDetailComponent } from './faq-detail/faq-detail.component';
import { FaqModalComponent } from './_directives/faq-modal/faq-modal.component';

@NgModule({
  declarations: [
    MarketingComponent,
    MarketingLandingComponent,
    MarketingCoachesLandingComponent,
    MarketingHeaderComponent,
    MarketingFooterComponent,
    BlogComponent,
    BlogDetailComponent,
    FindCoachComponent,
    OpenEventsComponent,
    CoachHomePageComponent,
    FaqComponent,
    FaqDetailComponent,
    InsightsComponent,
    InsightDetailComponent,
    PrivacyComponent,
    TermsComponent,
    FaqModalComponent,
  ],
  imports: [
    MarketingRoutingModule,
    SharedModule,
    CommonModule,
  ]
})
export class MarketingModule { }
