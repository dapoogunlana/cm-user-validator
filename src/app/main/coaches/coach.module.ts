
import { NgModule } from '@angular/core';

import { CoachRoutingModule } from './coach-routing.module';
import { CoachComponent } from './coach.component';
import { CoachDashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { CoachHeaderComponent } from './_Layout-Components/header/header.component';
import { CoachFooterComponent } from './_Layout-Components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { CoachSessionsComponent } from './sessions/sessions.component';
import { CoachEventsComponent } from './coach-event/coach-events.component';
import { CoachProfileOldComponent } from './profile-old/profile.component';
import { CashToBankModalComponent } from './_directives/cash-to-bank-modal/cash-to-bank-modal.component';
import { WalletHistoryModalComponent } from './_directives/wallet-history-modal/wallet-history-modal.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { CoachDashboardOldComponent } from './dashboard-old/dashboard.component';
import { CoachOverviewComponent } from './overview/overview.component';
import { CoachOneOnOneComponent } from './one-on-one/one-on-one.component';
import { CoachGroupComponent } from './group/group.component';
import { CoachAvailabilityComponent } from './availability/availability.component';
import { CoachImpactComponent } from './impact/impact.component';
import { CoachProfileComponent } from './profile-new/profile.component';
import { CoachGroupDetailsComponent } from './group-details/group-details.component';
import { CoachInviteComponent } from './invite/invite.component';
import { CoachNotificationComponent } from './notification/notification.component';
import { CoachOneOnOneDetailsComponent } from './one-on-one-details/one-on-one-details.component';
import { CoachPayoutComponent } from './payout/payout.component';
import { GroupTicketModalComponent } from './_directives/group-ticket-modal/group-ticket-modal.component';

@NgModule({
  declarations: [
    CoachComponent,
    CoachHeaderComponent,
    CoachFooterComponent,
    CoachDashboardComponent,
    CoachDashboardOldComponent,
    CoachSessionsComponent,
    CoachEventsComponent,
    CoachProfileOldComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    CreateEventComponent,


    CoachOverviewComponent,
    CoachOneOnOneComponent,
    CoachOneOnOneDetailsComponent,
    CoachGroupComponent,
    CoachGroupDetailsComponent,
    CoachImpactComponent,
    CoachProfileComponent,
    CoachAvailabilityComponent,
    CoachPayoutComponent,
    CoachNotificationComponent,
    CoachInviteComponent,

    // Sub Components
    CashToBankModalComponent,
    WalletHistoryModalComponent,
    GroupTicketModalComponent,
  ],
  imports: [
    CoachRoutingModule,
    SharedModule,
    CommonModule,
  ]
})
export class CoachModule { }
