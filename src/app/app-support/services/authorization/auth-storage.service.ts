import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthStorageService {

  constructor(private router: Router) {}

  saveString(name: string, item: string): void {
    localStorage.setItem(name, item);
  }
  saveObj(name: string, obj: any): void {
    localStorage.setItem(name, JSON.stringify(obj));
  }

  getObj(name: string): any {
    return JSON.parse(localStorage.getItem(name));
  }
  getString(name: string): string {
    return localStorage.getItem(name);
  }
  removeAny(name: string): void {
    localStorage.removeItem(name);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/auth/sign-in');
  }

  redirectLoggedIn(): boolean {
    const token = this.getString('token');
    if (!token) {
      return false;
    } else {
      const userDetails = this.getObj('userDetails') || {};
      if (!userDetails) {
        return false;
      }
      if (userDetails.userRole === 'coach') {
        if (!userDetails.isRegistrationApproved) {
          this.router.navigateByUrl('/auth/confirm-email');
          this.removeAny('userDetails');
          this.removeAny('token');
          return;
        }
        if (userDetails.isRegistrationCompleted) {
          this.router.navigateByUrl('/coach');
          return;
        } else {
          this.router.navigateByUrl('/auth/overview');
          return;
        }
      }
      if (userDetails.userRole === 'protegee') {
        this.router.navigateByUrl('/protegee');
      }

      return false;
    }
  }

}
