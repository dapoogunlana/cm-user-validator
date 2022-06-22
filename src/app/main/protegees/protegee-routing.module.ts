import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProtegeeComponent } from './protegee.component';
import { ProtegeeDashboardComponent } from './dashboard/dashboard.component';
import { CoachDetailComponent } from '../shared/coach-detail/coach-detail.component';
import { CoachListComponent } from '../shared/coach-list/coach-list.component';
import { BookSessionComponent } from './book-session/book-session.component';


const routes: Routes = [
  {
    path: '',
    component: ProtegeeComponent,
    children: [
      {
        path: '',
        component: ProtegeeDashboardComponent
      },
      {
        path: 'coaches',
        component: CoachListComponent
      },
      {
        path: 'coach/:id',
        component: CoachDetailComponent
      },
      {
        path: 'book-session/:coachId',
        component: BookSessionComponent
      },
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
export class ProtegeeRoutingModule { }
