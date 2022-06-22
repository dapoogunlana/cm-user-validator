
import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { CoachSignupComponent } from './coach-signup/coach-signup.component';
import { ProtegeeSignupComponent } from './protegee-signup/protegee-signup.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { CoachSetupComponent } from './coach-setup/coach-setup.component';
import { CoachSetupPreviewComponent } from './coach-setup-preview/coach-setup-preview.component';
import { InviteVerificationComponent } from './invite-verification/invite-verification.component';
import { CoachSignupRoadmapComponent } from './coach-signup-roadmap/coach-signup-roadmap.component';
import { CoachPendingApprovalComponent } from './coach-pending-approval/coach-pending-approval.component';
import { OldCoachSignupComponent } from './coach-signup-old/coach-signup.component';
import { OldConfirmEmailComponent } from './confirm-email-old/confirm-email.component';
import { ChoosePasswordComponent } from './choose-password/choose-password.component';
import { CoachSignupNewComponent } from './coach-signup-new/coach-signup-new.component';
import { LogInComponent } from './log-in/log-in.component';
import { ForgotPasswordNewComponent } from './forgot-password-new/forgot-password-new.component';
import { CoachSetupOldComponent } from './coach-setup-old/coach-setup-old.component';

@NgModule({
  declarations: [
    CoachSignupComponent,
    ProtegeeSignupComponent,
    SignInComponent,
    ForgotPasswordComponent,
    ConfirmEmailComponent,
    CoachSetupPreviewComponent,
    CoachSetupOldComponent,
    InviteVerificationComponent,
    CoachSignupRoadmapComponent,
    CoachPendingApprovalComponent,
    OldCoachSignupComponent,
    OldConfirmEmailComponent,
    ChoosePasswordComponent,

    // New Comps
    CoachSignupNewComponent,
    LogInComponent,
    ForgotPasswordNewComponent,
    CoachSetupComponent,
  ],
  imports: [
    AuthRoutingModule,
    SharedModule,
    CommonModule,
  ]
})
export class AuthModule { }
