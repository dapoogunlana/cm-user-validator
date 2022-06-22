import { Component, OnInit, OnDestroy } from '@angular/core';
import { blogCards } from 'src/app/app-support/constants/dummy-constants';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {

  bolgs: any[] = blogCards;
  loaded: boolean;
  filters: any = null;
  filterInfo: any = {};

  constructor() { }

  ngOnInit(): void {
    this.loadBolgs();
  }

  runFilters(filter): void {
    console.log(filter);
    this.filters = filter;
    this.loadBolgs();
  }

  loadBolgs(): void {
    this.loaded = false;
    setTimeout(() => {
      this.filterInfo.count = 234500;
      this.loaded = true;
    }, 500);
  }

  ngOnDestroy(): void {}

}
