import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-coach-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class CoachFooterComponent implements OnInit, OnDestroy {

  year = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

}
