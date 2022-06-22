import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './app-support/services/authorization/auth.guard';


const routes: Routes = [
  {
    path: 'coach',
    loadChildren: () => import('./main/coaches/coach.module').then(m => m.CoachModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'protegee',
    loadChildren: () => import('./main/protegees/protegee.module').then(m => m.ProtegeeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./main/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    loadChildren: () => import('./main/marketing/marketing.module').then(m => m.MarketingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
