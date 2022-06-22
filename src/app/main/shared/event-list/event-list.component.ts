import { Component, OnInit, OnDestroy } from '@angular/core';
import { tutors, eventCards } from 'src/app/app-support/constants/dummy-constants';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

}
