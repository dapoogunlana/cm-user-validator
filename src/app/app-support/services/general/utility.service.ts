import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})

export class UtilityService {

    constructor(public router: Router) {}

    setUpUserDetails() {
        let loggedInState;
        let userDetailFields;
        if (sessionStorage.getItem('token')) {
        loggedInState = true;
        userDetailFields = {
            token: sessionStorage.getItem('token'),
            role: sessionStorage.getItem('role'),
            firstName: sessionStorage.getItem('firstName'),
            lastName: sessionStorage.getItem('lastName'),
            image: sessionStorage.getItem('image'),
            fullName: sessionStorage.getItem('firstName') + ' ' + sessionStorage.getItem('lastName')
        };
        } else {
        loggedInState = false;
        }
        return { loggedInState, userDetailFields };
    }

    calculateStars(count) {
      let positiveStars;
      let negativeStars;
      const positiveStarArray = [];
      const negativeStarArray = [];
      if (count && count >= 0 && count <= 5) {
        positiveStars = count;
        negativeStars = (5 - positiveStars);
      } else {
        negativeStars = 5;
        positiveStars = 0;
      }
      for (let i = 0; i < positiveStars; i++) {
        positiveStarArray.push('i');
      }
      for (let i = 0; i < negativeStars; i++) {
        negativeStarArray.push('i');
      }
      return { positiveStars: positiveStarArray, negativeStars: negativeStarArray };
    }

    calculateColoredStars(rating): string {
      if (!rating || isNaN(rating) || rating < 0 || rating > 5) {
        return '';
      }
      const count = parseFloat(rating);
      const starArray = [];
      for (let i = 0; i < count; i++) {
        starArray.push('<i class="fas fa-star c-orange"></i> ');
      }
      for (let i = count; i < 5; i++) {
        starArray.push('<i class="fas fa-star c-grey-light"></i> ');
      }
      return starArray.join(' ');
    }

    clipText(text: string, length: number, returnString?: string): string {
      if (text && length) {
        if (text.length <= length) {
          return text;
        } else {
          const subText = text.substring(0, (length - 2)) + '..';
          return subText;
        }
      } else {
        return returnString ? returnString : '...';
      }
    }

    navigateTo(url: string): void {
      this.router.navigateByUrl(url);
    }

    checkAuth() {
      if (!sessionStorage.getItem('token')) {
        this.router.navigateByUrl('/');
      }
    }

    sortStatusCapsule(status): string {
      if (!status) {
        return '';
      }
      if (status === 'Paid' || status === 'paid') {
        return `<div class="p-3 rad-10 success-capsule">Paid</div>`
      }
      if (status === 'pending' || status === 'Pending') {
        return `<div class="p-3 rad-10 warning-capsule">Pending</div>`
      }
      if (status === 'failed' || status === 'Failed') {
        return `<div class="p-3 rad-10 danger-capsule">Failed</div>`
      }
    }

}
