import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tutors, eventCards, tutorCards, coachTestimonies } from 'src/app/app-support/constants/dummy-constants';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';
import { FilterService } from 'src/app/app-support/services/general/filter.service';
import { UtilityService } from 'src/app/app-support/services/general/utility.service';

@Component({
  selector: 'app-coach-detail',
  templateUrl: './coach-detail.component.html',
  styleUrls: ['./coach-detail.component.scss']
})
export class CoachDetailComponent implements OnInit, OnDestroy {

  coachId: number;
  loaded: boolean;
  coachDetails: any = {};
  activeTab = 'coach_event';
  coachEvents = [];
  testimonies = coachTestimonies;
  isLoggedIn = false;

  constructor(
    public utility: UtilityService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private apiService: ApiLoaderService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.getCoachId();
  }

  getCoachId(): void {
    this.coachId = this.route.snapshot.params.id;
    this.fetchCoach();
  }

  // getCoachId(): void {
  //   this.coachId = parseFloat(this.route.snapshot.params.id);
  //   this.coachDetails = tutorCards.find((item) => item.coachId === this.coachId) || {};
  // }

  fetchCoach(): void {
    this.loaded = false;
    this.apiService.load({
      url: 'Coach/CoachDetail?id=' + this.coachId,
      route: 'ADMIN',
      method: 'POST'
    }).toPromise().then((res) => {
      console.log(res);
      this.coachDetails = res || {};
      this.coachEvents = res.events || [];
    }).finally(() => {
      this.loaded = true;
    });
  }

  switchTab(tab): void {
    this.activeTab = tab;
  }

  switchLogin(): void {
    this.isLoggedIn = !this.isLoggedIn;
  }

  checkToBookSession(): void {
    if (this.isLoggedIn) {
      this.router.navigate([`/protegee/book-session/${this.coachId}`]);
    } else {
      this.router.navigate(['/auth/sign-in'], {queryParams: {rtn: true, type: 'book-session', id: this.coachId}});
    }
  }

  ngOnDestroy(): void {}

}
