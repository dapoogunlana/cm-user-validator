import { Component, OnInit, OnDestroy } from '@angular/core';
import { endedSessionCards, tutorCards, upcomingSessionCards } from 'src/app/app-support/constants/dummy-constants';

@Component({
  selector: 'app-coach-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class CoachSessionsComponent implements OnInit, OnDestroy {

  activeTab = 'upcoming_sessions';
  upcomingSessions: any[] = [];
  endedSessions: any[] = [];

  constructor() {
    this.upcomingSessions = upcomingSessionCards;
    this.endedSessions = endedSessionCards;
  }

  ngOnInit(): void {}

  switchTab(tab): void {
    this.activeTab = tab;
    console.log(this.activeTab);
  }

  ngOnDestroy(): void {}

}
