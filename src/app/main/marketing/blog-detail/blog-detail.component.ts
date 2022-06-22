import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { blogCards } from 'src/app/app-support/constants/dummy-constants';
import { UtilityService } from 'src/app/app-support/services/general/utility.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit, OnDestroy {

  blogId: number;
  blogDetails: any = {};

  constructor(public utility: UtilityService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchBlog();
  }

  fetchBlog(): void {
    this.blogId = parseFloat(this.route.snapshot.params.id);
    this.blogDetails = blogCards.find((item) => item.blogId === this.blogId) || {};
  }

  ngOnDestroy(): void {}

}
