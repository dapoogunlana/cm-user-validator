import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { routeConstants } from 'src/app/app-support/constants/core-constants';
import { tutors, eventCards, tutorCards } from 'src/app/app-support/constants/dummy-constants';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';
import { FilterService } from 'src/app/app-support/services/general/filter.service';

@Component({
  selector: 'app-coach-list',
  templateUrl: './coach-list.component.html',
  styleUrls: ['./coach-list.component.scss']
})
export class CoachListComponent implements OnInit, OnDestroy {

  tutors: any[] = tutorCards;
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
    ) { }

  ngOnInit(): void {
    this.loadCoaches();
  }

  runFilters(filter): void {
    console.log(filter);
    this.filters = filter;
    this.loadCoaches();
  }

  loadCoaches(): void {
    this.loaded = false;
    const params = this.filterService.processQueries({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      ...this.filters,
    });
    this.loaded = false;
    this.apiService.load({
      url: 'Coach/Coaches' + params,
      route: routeConstants.ADMIN,
      method: 'POST'
    }).toPromise().then((res) => {
      console.log(res);
      this.tutors = res.coaches || [];
    }).finally(() => {
      this.loaded = true;
    });
  }

  ngOnDestroy(): void {}

}
