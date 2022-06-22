import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketingComponent } from './marketing.component';
import { MarketingCoachesLandingComponent } from './coaches-landing/coaches-landing.component';
import { MarketingLandingComponent } from './landing/landing.component';
import { CoachListComponent } from '../shared/coach-list/coach-list.component';
import { FindCoachComponent } from './find-coach/find-coach.component';
import { CoachDetailComponent } from './../shared/coach-detail/coach-detail.component';
import { EventListComponent } from './../shared/event-list/event-list.component';
import { EventDetailComponent } from './../shared/event-detail/event-detail.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { OpenEventsComponent } from './open-events/open-events.component';
import { CoachHomePageComponent } from './coach-home-page/coach-home-page.component';
import { FaqComponent } from './faq/faq.component';
import { InsightsComponent } from './insights/insights.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { FaqDetailComponent } from './faq-detail/faq-detail.component';
import { InsightDetailComponent } from './insight-detail/insight-detail.component';


const routes: Routes = [
  {
    path: '',
    component: MarketingComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: CoachHomePageComponent,
        pathMatch: 'full'
      },
      {
        path: 'faq',
        component: FaqComponent,
        pathMatch: 'full'
      },
      {
        path: 'faq/:link',
        component: FaqDetailComponent,
        pathMatch: 'full'
      },
      {
        path: 'insights',
        component: InsightsComponent,
        pathMatch: 'full'
      },
      {
        path: 'insight/:id',
        component: InsightDetailComponent,
        pathMatch: 'full'
      },
      {
        path: 'privacy',
        component: PrivacyComponent,
        pathMatch: 'full'
      },
      {
        path: 'terms',
        component: TermsComponent,
        pathMatch: 'full'
      },
      // {
      //   path: 'home',
      //   component: MarketingLandingComponent
      // },
      // {
      //   path: 'coach-home',
      //   component: CoachHomePageComponent,
      //   pathMatch: 'full'
      // },
      // {
      //   path: 'become-a-coach',
      //   component: MarketingCoachesLandingComponent
      // },
      // {
      //   path: 'find-coach',
      //   component: FindCoachComponent
      // },
      // {
      //   path: 'coach-list',
      //   component: CoachListComponent
      // },
      // {
      //   path: 'coach-detail/:id',
      //   component: CoachDetailComponent
      // },
      // {
      //   path: 'events',
      //   component: OpenEventsComponent
      // },
      // {
      //   path: 'event/:id',
      //   component: EventDetailComponent
      // },
      // {
      //   path: 'blog',
      //   component: BlogComponent
      // },
      // {
      //   path: 'blog/:id',
      //   component: BlogDetailComponent
      // },
      {
        path: '**',
        redirectTo: ''
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketingRoutingModule { }
