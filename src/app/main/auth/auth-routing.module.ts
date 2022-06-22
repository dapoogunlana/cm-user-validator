import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/app-support/services/authorization/auth.guard';
import { ChoosePasswordComponent } from './choose-password/choose-password.component';
import { CoachPendingApprovalComponent } from './coach-pending-approval/coach-pending-approval.component';
import { CoachSetupPreviewComponent } from './coach-setup-preview/coach-setup-preview.component';
import { CoachSetupComponent } from './coach-setup/coach-setup.component';
import { CoachSignupNewComponent } from './coach-signup-new/coach-signup-new.component';
import { OldCoachSignupComponent } from './coach-signup-old/coach-signup.component';
import { CoachSignupRoadmapComponent } from './coach-signup-roadmap/coach-signup-roadmap.component';
import { CoachSignupComponent } from './coach-signup/coach-signup.component';
import { OldConfirmEmailComponent } from './confirm-email-old/confirm-email.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ForgotPasswordNewComponent } from './forgot-password-new/forgot-password-new.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { InviteVerificationComponent } from './invite-verification/invite-verification.component';
import { LogInComponent } from './log-in/log-in.component';
import { ProtegeeSignupComponent } from './protegee-signup/protegee-signup.component';
import { SignInComponent } from './sign-in/sign-in.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'log-in',
    pathMatch: 'full',
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'log-in',
    component: LogInComponent,
  },
  {
    path: 'signup-roadmap',
    component: CoachSignupRoadmapComponent,
  },
  {
    path: 'coach-signup-old',
    component: OldCoachSignupComponent,
  },
  {
    path: 'coach-signup',
    component: CoachSignupComponent,
  },
  {
    path: 'coach-request-invite',
    component: CoachSignupNewComponent,
  },
  {
    path: 'protegee-signup',
    component: ProtegeeSignupComponent,
  },
  // {
  //   path: 'forgot-password',
  //   component: ForgotPasswordComponent,
  // },
  {
    path: 'forgot-password',
    component: ForgotPasswordNewComponent,
  },
  {
    path: 'choose-password',
    component: ChoosePasswordComponent,
  },
  {
    path: 'confirm-email-old',
    component: OldConfirmEmailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'confirm-email',
    component: ConfirmEmailComponent,
  },
  {
    path: 'overview',
    component: CoachSetupPreviewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile-setup',
    component: CoachSetupComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'awaiting-approval',
    component: CoachPendingApprovalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'verify-invite',
    component: InviteVerificationComponent,
  },
  {
    path: '**',
    redirectTo: 'sign-in'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
