import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { coachSessionData, interests } from 'src/app/app-support/constants/dummy-constants';
import { agreements } from 'src/app/app-support/constants/dummy-writeups';
import { planAgreements } from 'src/app/app-support/constants/info-constants';
import { coachSetupPayload } from 'src/app/app-support/interfaces/sample-objects';
import { AuthStorageService } from 'src/app/app-support/services/authorization/auth-storage.service';
import { BookSessionService } from 'src/app/app-support/services/protegee-services/book-session.service';
import { ApiLoaderService } from 'src/app/app-support/services/general/api-loader.service';
import { FileUploadService } from 'src/app/app-support/services/general/file-upload.service';

@Component({
  selector: 'app-book-session',
  templateUrl: './book-session.component.html',
  styleUrls: ['./book-session.component.scss']
})
export class BookSessionComponent implements OnInit, OnDestroy {

  pricingPlans: any[] = [];
  coachSessionData = coachSessionData;
  progressLevel = 0;
  loadingProgress = false;

  constructor(
    private apiService: ApiLoaderService,
    private storage: AuthStorageService,
    private router: Router,
    private toastr: ToastrService,
    private fileUploadService: FileUploadService,
    // public bookSessionService: BookSessionService,
  ) { }

  ngOnInit(): void {
    this.setup();
  }

  setup(): void {
    this.loadPricingPlans();
  }

  back(): void {
    this.progressLevel -= 1;
  }

  forward(): void {
    if (this.progressLevel < 2) {
      this.progressLevel += 1;
    }
    return;
  }

  loadPricingPlans(): void {
    this.apiService.load({
      url: 'Configuration/AllPricingPlans',
    }).toPromise().then((res) => {
      this.pricingPlans = res || [];
      if (this.coachSessionData.coachPricingPlans) {
          this.populatePricingPlanData();
      }
    });
  }

  populatePricingPlanData(): void {
    this.progressLevel += 1;
    this.coachSessionData.coachPricingPlans =
    this.coachSessionData.coachPricingPlans.map((bill: any, index: number) => {
        const fullBill = this.pricingPlans.find((item) => item.id === bill.id);
        if (fullBill) {
            bill.extra = {
                briefSummary: fullBill.briefSummary,
                descriptions: fullBill.descriptions,
            };
        }
        return bill;
    });
  }

  selectPlan(index): void {
    this.coachSessionData.coachPricingPlans.map((plan) => {
      plan.selected = false;
      return plan;
    });
    this.coachSessionData.coachPricingPlans[index].selected = true;
  }

  cancel(): void {
    window.history.back();
  }

  submit(): void {
    console.log('Finish');
    this.router.navigateByUrl('/coach');
  }

  ngOnDestroy(): void {}

}

