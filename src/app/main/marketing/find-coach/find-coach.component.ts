import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tutorCards } from 'src/app/app-support/constants/dummy-constants';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';
import { FilterService } from 'src/app/app-support/services/general/filter.service';

@Component({
  selector: 'app-find-coach',
  templateUrl: './find-coach.component.html',
  styleUrls: ['./find-coach.component.scss']
})
export class FindCoachComponent implements OnInit, OnDestroy {

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
      url: 'Coach/Coaches' + params,
      method: 'POST',
      route: 'ADMIN',
      data: {}
    }).toPromise().then((res) => {
      console.log(res);
      this.tutors = res.coaches || [];
    }).finally(() => {
      this.loaded = true;
    });
  }

  ngOnDestroy(): void {}

}
