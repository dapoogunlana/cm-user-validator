import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { endedSessionCards, tutorCards, upcomingSessionCards } from 'src/app/app-support/constants/dummy-constants';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';
import { FilterService } from 'src/app/app-support/services/general/filter.service';

@Component({
  selector: 'app-coach-events',
  templateUrl: './coach-events.component.html',
  styleUrls: ['./coach-events.component.scss']
})
export class CoachEventsComponent implements OnInit, OnDestroy {

  activeTab = 'upcoming_events';
  upcomingSessions: any[] = [];
  endedSessions: any[] = [];

  events: any[] = [];
  loaded: boolean;
  filters: any = null;
  filterInfo: any = {};
  pageNumber = 1;
  pageSize = 20;

  constructor(
    private toastr: ToastrService,
    private apiService: ApiLoaderService,
    private router: Router,
    private filterService: FilterService,
  ) {
    this.upcomingSessions = upcomingSessionCards;
    this.endedSessions = endedSessionCards;
  }


  ngOnInit(): void {
    this.loadEvents();
  }

  switchTab(tab): void {
    this.activeTab = tab;
    console.log(this.activeTab);
    this.loadEvents();
  }

  runFilters(filter): void {
    console.log(filter);
    this.filters = filter;
    this.loadEvents();
  }

  loadEvents(): void {
    if (this.activeTab === 'upcoming_events') {
      this.pageSize = 8;
    } else {
      this.pageSize = 3;
    }
    this.loaded = false;
    const params = this.filterService.processQueries({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      ...this.filters,
    });
    this.loaded = false;
    this.apiService.load({
      url: 'Event/Events' + params,
      method: 'POST',
      route: 'ADMIN',
      data: {}
    }).toPromise().then((res) => {
      console.log(res);
      this.events = res.events || [];
    }).finally(() => {
      this.loaded = true;
    });
  }

  ngOnDestroy(): void {}

}
