import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { eventCards } from 'src/app/app-support/constants/dummy-constants';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';
import { FilterService } from 'src/app/app-support/services/general/filter.service';

@Component({
  selector: 'app-open-events',
  templateUrl: './open-events.component.html',
  styleUrls: ['./open-events.component.scss']
})
export class OpenEventsComponent implements OnInit, OnDestroy {

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
  ) {}

  ngOnInit(): void {
    this.loadTutors();
  }

  runFilters(filter): void {
    console.log(filter);
    this.filters = filter;
    this.loadTutors();
  }

  loadTutors(): void {
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
