import { Component, OnInit, OnDestroy } from '@angular/core';
import { userDetail } from 'src/app/app-support/constants/dummy-constants';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';
import { UtilityService } from 'src/app/app-support/services/general/utility.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { groupSessionetails } from 'src/app/app-support/constants/dummy-coach-constants';
import { TableLoaderService } from 'src/app/app-support/services/general/table-loader.service';
import { FileUploadService } from 'src/app/app-support/services/general/file-upload.service';
import { timeList } from 'src/app/app-support/constants/dummy-unboarding-constants';
import { AuthStorageService } from 'src/app/app-support/services/authorization/auth-storage.service';
import { routeConstants } from 'src/app/app-support/constants/core-constants';

@Component({
  selector: 'app-coach-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class CoachGroupComponent implements OnInit, OnDestroy {

  userDetails: any = {};
  activeTab = 'new';
  sessionDetailsLoaded = false;
  newGroupSession: any = {};
  newGroupSessionImage: any = null;
  activeDrag = false;
  timeList = timeList;
  openTicketModal = false;
  ticketDetail: any = {
    type: 'new',
  }
  ticketList: any[] = [];

  upcomingessionsTableData = {
    headerRow: ['Dates', 'Name', 'Type', 'Registration'],
    bodyRows: []
  }
  previousSessionsTableData = {
    headerRow: ['Dates', 'Name', 'Type', 'Registration'],
    bodyRows: []
  }


  constructor(
    public utility: UtilityService,
    private apiService: ApiLoaderService,
    private router: Router,
    private toastr: ToastrService,
    public loaderService: TableLoaderService,
    private fileUploadService: FileUploadService,
    public storageService: AuthStorageService,
  ) {
    this.userDetails = storageService.getObj('userDetails') || {};
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    setTimeout(() => {
      this.loaderService.setLoaded();
      this.getEvents();
      // this.getUpcomingEvents();
    }, 1000);
  }

  switchTab(tab): void {
    this.activeTab = tab;
  }


  getEvents(): void {
    this.apiService.load({
      url: 'consultation/retrieve-event-data',
      method: 'POST',
      data: {
        userId: this.userDetails.id
      },
      route: routeConstants.COACHV1
    }).toPromise().then((res) => {
      console.log(res);
      this.sessionDetailsLoaded = true;
      this.setupUpcomingTableRows(res.upcomingSession);
      this.setupPreviousTableRows(res.previousSession);
    });
  }

  getUpcomingEvents(): void {
    this.apiService.load({
      url: 'consultation/expert-upcomming-consultations',
      method: 'POST',
      data: {
        userId: this.userDetails.id
      },
      route: routeConstants.COACHV1
    }).toPromise().then((res) => {
      console.log(res);
    });
  }

  setupUpcomingTableRows(data) {
    this.upcomingessionsTableData.bodyRows = data.map((item) => {
      return [
        item.date,
        `<div class="spread-info-front">
          <img src="./../../../../assets/images/new-coach-dashboard/one-on-one-icon-block.svg" width="60" />
          <a href="/coach/group/${item.id}"><span class="ml-3">${item.name}</span></a>
        </div>`,
        item.type,
        item.registration
      ];
    });
  }

  setupPreviousTableRows(data) {
    this.previousSessionsTableData.bodyRows = data.map((item) => {
      return [
        item.date,
        `<div class="spread-info-front">
          <img src="./../../../../assets/images/new-coach-dashboard/one-on-one-icon-block.svg" width="60" />
          <a href="/coach/group/${item.id}"><span class="ml-3">${item.name}</span></a>
        </div>`,
        item.type,
        item.registration
      ];
    });
  }

  triggerImageSaver(): void {
    const imageInput = document.getElementById('hidden_image_holder');
    imageInput.click();
  }

  processDrag(e: Event): void {
    e.preventDefault();
  }

  processDragEnter(e: Event): void {
    e.preventDefault();
    this.activeDrag = true;
  }

  processDragLeave(e: Event): void {
    e.preventDefault();
    this.activeDrag = false;
  }

  collectDragImage(e): void {
    e.preventDefault();
    this.activeDrag = false;
    this.processImage(e.dataTransfer.files[0]);
  }

  collectImage(ev): void {
    this.processImage(ev.target.files[0]);
  }

  processImage(file): void {
    if (!this.fileUploadService.checkFileFormat(file, 'image') || !this.fileUploadService.checkFileSize(file, 500, 'kb')) {
      this.discardImage();
      return;
    }
    const img = new Image();
    img.onload = (test: any) => {
      const height = test.path[0].height;
      const width = test.path[0].width;
      // this.imgPreview = true;
      const aspectRatio = (width / height);
      if (aspectRatio > 1.1 || aspectRatio < 0.9) {
        this.toastr.error('Please upload an image with aspect ratio of 1:1 (A square image)');
        this.discardImage();
        return;
      }
      // console.log(height, ' , ', width);
    };
    const fileReader = new FileReader();
    fileReader.onload = (data: any) => {
      this.newGroupSessionImage = data.target.result;
    };
    fileReader.readAsDataURL(file);
    console.log(URL.createObjectURL(file));
    img.src = URL.createObjectURL(file);
  }

  discardImage(): void {
    // this.imgPreview = false;
    this.newGroupSessionImage = null;
  }

  updateStartTime(ev): any {}

  updateEndTime(ev): any {}

  newTicket(): any {
    this.openTicketModal = true;
    this.ticketDetail = {
      type: 'new',
      data: {}
    };
  }

  editTicket(ticket): any {
    this.openTicketModal = true;
    this.ticketDetail = {
      type: 'edit',
      data: ticket
    };
  }

  deleteTicket(index): any {
    this.ticketList.splice(index, 1);
  }

  receiveTicket(ev): void {
    this.openTicketModal = false;
    if (!ev) {
      return;
    }
    if (ev.type === 'new') {
      this.ticketList.push({
        ...ev.data,
        id: new Date().getTime()
      })
    } else {
      // const
    }
    console.log(ev);
  }

  createGroupSession(): void {
    if (this.ticketList.length === 0) {
      this.toastr.error('You need to add a ticket to create a group event');
      return;
    }
    console.log({newGroupSession: this.newGroupSession, tickets: this.ticketList});
  }

  ngOnDestroy(): void {}

}

