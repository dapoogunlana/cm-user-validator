import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from 'src/app/app-support/services/general/utility.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

  @Input() dateData: any;
  @Input() availableDates: any[] = [];
  @Input() canEdit: boolean;
  @Output() dateChosen: EventEmitter<any> = new EventEmitter<any>();
  @Output() dateRemoved: EventEmitter<any> = new EventEmitter<any>();
  isMobile: boolean;

  constructor(
    public utility: UtilityService,
    private toastr: ToastrService,
  ) {
    if (window.innerWidth > 750) {
      this.isMobile = false;
    } else {
      this.isMobile = true;
    }
  }

  ngOnInit(): void {}

  openDateDialogue() {
    this.toastr.info('Under Development');
    return;
    console.log('Opening');
    document.getElementById('pick-date').click();
  }
  chooseDate(ev): void {
    console.log(ev);
    this.dateChosen.emit();
  }

  removeAvailability(id): void {
    this.dateRemoved.emit(id);
  }

  ngOnDestroy(): void {}

}
