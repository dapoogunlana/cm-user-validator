import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tutors, eventCards } from 'src/app/app-support/constants/dummy-constants';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';
import { FilterService } from 'src/app/app-support/services/general/filter.service';
import { UtilityService } from 'src/app/app-support/services/general/utility.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit, OnDestroy {

  eventId: number;
  eventDetails: any = {};
  activeTab = 'event_outline';
  eventCards = eventCards;

  events: any[] = [];
  loaded: boolean;
  filters: any = null;
  filterInfo: any = {};
  pageNumber = 1;
  pageSize = 8;

  constructor(
    private toastr: ToastrService,
    private apiService: ApiLoaderService,
    private router: Router,
    private filterService: FilterService,
    public utility: UtilityService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.fetchCoach();
    this.loadEvents();
  }

  runFilters(filter): void {
    console.log(filter);
    this.filters = filter;
    this.loadEvents();
  }

  fetchCoach(): void {
    this.eventId = parseFloat(this.route.snapshot.params.id);
    this.eventDetails  = eventCards[2];
    // this.eventDetails  = eventCards.find((item) => item.eventId === this.eventId) || {};
  }

  switchTab(tab): void {
    this.activeTab = tab;
  }

  loadEvents(): void {
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
