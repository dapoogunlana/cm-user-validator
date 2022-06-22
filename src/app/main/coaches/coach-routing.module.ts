import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionDetailComponent } from '../shared/session-detail/session-detail.component';
import { CoachAvailabilityComponent } from './availability/availability.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CoachEventsComponent } from './coach-event/coach-events.component';
import { CoachComponent } from './coach.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { CoachDashboardComponent } from './dashboard/dashboard.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CoachGroupDetailsComponent } from './group-details/group-details.component';
import { CoachGroupComponent } from './group/group.component';
import { CoachImpactComponent } from './impact/impact.component';
import { CoachInviteComponent } from './invite/invite.component';
import { CoachNotificationComponent } from './notification/notification.component';
import { CoachOneOnOneDetailsComponent } from './one-on-one-details/one-on-one-details.component';
import { CoachOneOnOneComponent } from './one-on-one/one-on-one.component';
import { CoachOverviewComponent } from './overview/overview.component';
import { CoachPayoutComponent } from './payout/payout.component';
import { CoachProfileComponent } from './profile-new/profile.component';
import { CoachProfileOldComponent } from './profile-old/profile.component';
import { CoachSessionsComponent } from './sessions/sessions.component';


const routes: Routes = [
  {
    path: '',
    component: CoachComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview'
      },
      {
        path: 'overview',
        component: CoachOverviewComponent,
        pathMatch: 'full'
      },
      {
        path: 'one-on-one',
        component: CoachOneOnOneComponent,
      },
      {
        path: 'one-on-one/:id',
        component: CoachOneOnOneDetailsComponent,
      },
      {
        path: 'group',
        component: CoachGroupComponent,
      },
      {
        path: 'group/:id',
        component: CoachGroupDetailsComponent,
      },
      {
        path: 'impact',
        component: CoachImpactComponent,
      },
      {
        path: 'profile',
        component: CoachProfileComponent,
      },
      {
        path: 'availability',
        component: CoachAvailabilityComponent,
      },
      {
        path: 'payout',
        component: CoachPayoutComponent,
      },
      {
        path: 'notification',
        component: CoachNotificationComponent,
      },
      {
        path: 'invite',
        component: CoachInviteComponent,
      },

      





      {
        path: 'sessions',
        component: CoachSessionsComponent,
      },
      {
        path: 'session/:id',
        component: SessionDetailComponent,
      },
      {
        path: 'events',
        component: CoachEventsComponent,
      },
      {
        path: 'event/:id',
        component: CoachSessionsComponent,
      },
      {
        path: 'insights',
        component: CoachSessionsComponent,
      },
      {
        path: 'insight/:id',
        component: CoachSessionsComponent,
      },
      {
        path: 'profile',
        component: CoachProfileOldComponent,
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent,
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },
      {
        path: 'create-event',
        component: CreateEventComponent,
      },
      {
        path: '**',
        redirectTo: 'overview'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoachRoutingModule { }
