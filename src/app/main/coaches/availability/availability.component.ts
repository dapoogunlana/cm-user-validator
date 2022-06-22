import { Component, OnInit, OnDestroy } from '@angular/core';
import { userDetail } from 'src/app/app-support/constants/dummy-constants';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';
import { UtilityService } from 'src/app/app-support/services/general/utility.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { availabilityData } from 'src/app/app-support/constants/dummy-coach-constants';
import { timeList, timeListTranslation } from 'src/app/app-support/constants/dummy-unboarding-constants';
import { routeConstants } from 'src/app/app-support/constants/core-constants';
import { AuthStorageService } from 'src/app/app-support/services/authorization/auth-storage.service';
import { TableLoaderService } from 'src/app/app-support/services/general/table-loader.service';

@Component({
  selector: 'app-coach-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss']
})
export class CoachAvailabilityComponent implements OnInit, OnDestroy {

  userDetails: any = {};
  availabilityData: any = {};
  availabilityLoaded = false;
  timeListTranslation = timeListTranslation;
  timeList = timeList;

  availabilitySchedullerData: any = {
    sunday: {},
    monday: {},
    tuesday: {},
    wednesday: {},
    thursday: {},
    friday: {},
    saturday: {},
  }

  constructor(
    public utility: UtilityService,
    private apiService: ApiLoaderService,
    private router: Router,
    private toastr: ToastrService,
    public loaderService: TableLoaderService,
    public storageService: AuthStorageService,
  ) {
    this.userDetails = storageService.getObj('userDetails') || {};
  }

  ngOnInit(): void {
    this.getAvailability();
  }

  getAvailability(): void {
    this.loaderService.setLoading();
    this.apiService.load({
      url: 'get-expert-availability',
      method: 'POST',
      data: {
        userId: this.userDetails.id
      },
      route: routeConstants.AUTHV1
    }).toPromise().then((res) => {
      console.log(res);
      this.availabilityData = res.availability;
    }).finally(() => {
      this.loaderService.setLoaded();
      this.availabilityLoaded = true;
    });
  }


  switchAvailabilityActive(field): void {
    this.availabilityData.serviceScheduling[field].active =
    !this.availabilityData.serviceScheduling[field].active;
  }

  updateStartTime(ev, field): void {
    this.availabilitySchedullerData[field].startTime = ev.target.value;
    console.log({
      startTime: this.availabilitySchedullerData[field].startTime,
      serviceScheduling: this.availabilityData.serviceScheduling[field].hours
    });
  }

  updateEndtime(ev, field): void {
    this.availabilitySchedullerData[field].endTime = ev.target.value;
    console.log({
      endTime: this.availabilitySchedullerData[field].endTime,
      serviceScheduling: this.availabilityData.serviceScheduling[field].hours
    });
  }

  toggleAlwaysAvailable(): void {
    this.availabilityData.alwaysAvailable =
    !this.availabilityData.alwaysAvailable;
  }

  addAvailableHours(field): void {
    const startTime = parseFloat(this.availabilitySchedullerData[field].startTime);
    const endTime = parseFloat(this.availabilitySchedullerData[field].endTime);
    console.log({startTime, endTime});
    if ((!startTime && startTime !== 0) || (!endTime && endTime !== 0)) {
      this.toastr.error('Please enter a valid start time and end time');
      return;
    }
    if (endTime <= startTime) {
      this.toastr.error('Availability end time should be later than start time');
      return;
    }
    let conflictingTime = false;
    this.availabilityData.serviceScheduling[field].hours.map((item, index) => {
      if(startTime < item.to && endTime > item.from) {
        conflictingTime = true;
        console.log('Conflicting');
        console.log(item);
      } else {
        console.log('Not Conflicting');
      }
    });
    if (conflictingTime) {
      this.toastr.error('Time space chosen is overlapping an already existing time space');
      return;
    }
    this.availabilityData.serviceScheduling[field].hours.push({
      from: startTime,
      to: endTime
    });
    this.availabilitySchedullerData[field] = {}
    console.log({
      endTime: this.availabilitySchedullerData[field].endTime,
      startTime: this.availabilitySchedullerData[field].startTime,
      serviceScheduling: this.availabilityData.serviceScheduling[field].hours
    });
  }

  removeTimeBlock(field, index): void {
    this.availabilityData.serviceScheduling[field].hours.splice(index, 1);
  }

  save(): void {
    console.log({
      status: 'Saved',
      data: this.availabilityData
    });
    const availability = this.availabilityData;
    if (!availability.alwaysAvailable && (!availability.startDate || !availability.endDate)) {
      this.toastr.error('You can not proceed without information on the long term range of days you would be available');
      return;
    }
    if (new Date(availability.startDate).getTime() >=  new Date(availability.endDate).getTime()) {
      this.toastr.error('Your end date has to be later than your start date');
      return;
    }
    // if (!availability.hourlyRate) {
    //     this.toastr.error('You can not proceed without entering a valid hourly rate');
    //     return;
    // }
    const schedule = availability.serviceScheduling;
    let  activeDays = false;
    let  availableDates = false;
    let  emptyDays = false;
    for (const day in schedule) {
      if (day) {
        if (schedule[day].active) {
          activeDays = true;
        }
        if (schedule[day].hours.length > 0) {
          availableDates = true;
        }
        if (schedule[day].active && schedule[day].hours.length === 0) {
          emptyDays = true;
        }
      }
    }
    if (!activeDays) {
        this.toastr.error('You can not proceed without having an active day');
        return;
    }
    if (!availableDates) {
        this.toastr.error('You can not proceed without choosing an valid available period');
        return;
    }
    if (emptyDays) {
        this.toastr.error('You have some active days without any available time, please add available time or deactivate the unused days');
        return;
    }
    this.toastr.success('Saved');
  }

  ngOnDestroy(): void {}

}

