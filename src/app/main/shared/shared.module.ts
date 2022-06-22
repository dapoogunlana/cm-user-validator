
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

import { CoachCardComponent } from './_directives/coach-card/coach-card.component';
import { CoachListComponent } from './coach-list/coach-list.component';
import { CoachDetailComponent } from './coach-detail/coach-detail.component';

import { EventCardComponent } from './_directives/event-card/event-card.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventListComponent } from './event-list/event-list.component';
import { VideoModalComponent } from './_directives/video-modal/video-modal.component';
import { FindCoachFilterComponent } from './filters/find-coach-filter/find-coach-filter.component';
import { LoaderComponent } from './_directives/loader/loader.component';
import { BlogFilterComponent } from './filters/blog-filter/blog-filter.component';
import { EventsFilterComponent } from './filters/events-filter/events-filter.component';
import { BasicLoaderComponent } from './_directives/basic-loader/basic-loader.component';
import { BlogCardComponent } from './_directives/blog-card/blog-card.component';
import { CoachListFilterComponent } from './filters/coach-list-filter/coach-list-filter.component';
import { SessionDetailComponent } from './session-detail/session-detail.component';
import { SessionCardComponent } from './_directives/session-card/session-card.component';
import { InfoModalComponent } from './_directives/info-modal/info-modal.component';
import { CalendarComponent } from './_directives/calendar/calendar.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CropperComponent } from './_directives/cropper/cropper.component';
import { DefaultTableComponent } from './_directives/default-table/default-table.component';

const moduleDeclarations = [
  CoachCardComponent,
  BlogCardComponent,
  CoachListComponent,
  CoachDetailComponent,
  EventCardComponent,
  EventDetailComponent,
  EventListComponent,
  VideoModalComponent,
  InfoModalComponent,
  FindCoachFilterComponent,
  CoachListFilterComponent,
  LoaderComponent,
  BasicLoaderComponent,
  BlogFilterComponent,
  EventsFilterComponent,
  SessionDetailComponent,
  SessionCardComponent,
  CalendarComponent,
  CropperComponent,
  DefaultTableComponent,
];

const moduleImports = [
  FormsModule,
  ReactiveFormsModule,
  NgbCarouselModule,
  ImageCropperModule,
];

@NgModule({
  declarations: [
    ...moduleDeclarations,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    ...moduleImports,
  ],
  exports: [
    ...moduleDeclarations,
    ...moduleImports
  ]
})
export class SharedModule { }
