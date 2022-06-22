import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tutors, eventCards, tutorCards, coachTestimonies, sessionDetails, messages } from 'src/app/app-support/constants/dummy-constants';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';
import { FilterService } from 'src/app/app-support/services/general/filter.service';
import { UtilityService } from 'src/app/app-support/services/general/utility.service';

@Component({
  selector: 'app-session-detail',
  templateUrl: './session-detail.component.html',
  styleUrls: ['./session-detail.component.scss']
})
export class SessionDetailComponent implements OnInit, OnDestroy {

  coachId: number;
  loaded: boolean;
  sessionDetails: any = sessionDetails[0];
  activeTab = 'objectives';
  coachEvents = [];
  testimonies = coachTestimonies;
  messages = messages;

  constructor(
    public utility: UtilityService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private apiService: ApiLoaderService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    // this.getCoachId();
    console.log(this.sessionDetails);
  }

  getCoachId(): void {
    this.coachId = this.route.snapshot.params.id;
    this.fetchCoach();
  }

  // getCoachId(): void {
  //   this.coachId = parseFloat(this.route.snapshot.params.id);
  //   this.sessionDetails = tutorCards.find((item) => item.coachId === this.coachId) || {};
  // }

  fetchCoach(): void {
    this.loaded = false;
    this.apiService.load({
      url: 'Coach/CoachDetail?id=' + this.coachId,
      route: 'ADMIN',
      method: 'POST'
    }).toPromise().then((res) => {
      console.log(res);
      this.sessionDetails = res || {};
      this.coachEvents = res.events || [];
    }).finally(() => {
      this.loaded = true;
    });
  }

  switchTab(tab): void {
    this.activeTab = tab;
  }

  ngOnDestroy(): void {}

}
