import { Injectable } from '@angular/core';
import { AuthStorageService } from './auth-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authStorage: AuthStorageService) {}

  public isAuthenticated(): boolean {
    const token = this.authStorage.getString('token');
    if (token) {
      return true;
    } else {
      // // temporary
      // return true;

      return false;
    }
  }
}
