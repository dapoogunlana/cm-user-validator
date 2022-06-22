
import { NgModule } from '@angular/core';

import { ProtegeeRoutingModule } from './protegee-routing.module';
import { ProtegeeComponent } from './protegee.component';
import { ProtegeeDashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ProtegeeFooterComponent } from './_Layout-Components/footer/footer.component';
import { ProtegeeHeaderComponent } from './_Layout-Components/header/header.component';
import { CommonModule } from '@angular/common';
import { BookSessionComponent } from './book-session/book-session.component';

@NgModule({
  declarations: [
    ProtegeeComponent,
    ProtegeeDashboardComponent,
    ProtegeeHeaderComponent,
    ProtegeeFooterComponent,
    BookSessionComponent,
  ],
  imports: [
    ProtegeeRoutingModule,
    SharedModule,
    CommonModule,
  ]
})
export class ProtegeeModule { }
