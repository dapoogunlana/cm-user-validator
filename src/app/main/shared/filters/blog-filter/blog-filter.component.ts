import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FilterService } from 'src/app/app-support/services/general/filter.service';
import { UtilityService } from 'src/app/app-support/services/general/utility.service';

@Component({
  selector: 'app-blog-filter',
  templateUrl: './blog-filter.component.html',
  styleUrls: ['./blog-filter.component.scss']
})
export class BlogFilterComponent implements OnInit, OnDestroy {

  @Input() cardData: any;
  @Output() filterPayload: EventEmitter<any> = new EventEmitter<any>();
  form: any = {};
  category = 'all_results';
  openFilters = false;
  fixedFilter = false;
  isMobile: boolean;
  domains: any[] = [];
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];

  constructor(public utility: UtilityService, public filterService: FilterService) {
    if (window.innerWidth > 750) {
      this.isMobile = false;
    } else {
      this.isMobile = true;
    }
  }

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      let offset;
      if (this.isMobile) {
        offset = 140;
      } else {
        offset = 160;
      }
      if ((window.scrollY + offset) > window.innerHeight) {
        this.fixedFilter = true;
      } else {
        this.fixedFilter = false;
      }
    });
  }

  changeCategory(field: string): void {
    this.category = field;
    this.form.domain = field;
    this.filterAction();
  }

  clearFilters(): void {
    this.form = {};
  }

  filterAction(): void {
    this.openFilters = false;
    this.filterPayload.emit(this.filterService.processFilters(this.form));
  }

  toggleFilters(): void {
    this.openFilters = !this.openFilters;
  }

  ngOnDestroy(): void {}

}
