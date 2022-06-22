import { Component, OnInit, OnDestroy } from '@angular/core';
import { dummyAvater, userDetail } from 'src/app/app-support/constants/dummy-constants';
import { AuthStorageService } from 'src/app/app-support/services/authorization/auth-storage.service';

@Component({
  selector: 'app-coach-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class CoachHeaderComponent implements OnInit, OnDestroy {

  user: any = {};
  notification: any = {};
  userDetail: any = {};
  avater = dummyAvater;
  showUserMenu = false;
  showNotifications = true;

  constructor(public storageService: AuthStorageService) {
    setTimeout(() => {
      this.userDetail = userDetail;
    }, 3000);
    this.notification = {
      list: [],
      count: 3
    };
  }

  ngOnInit(): void {}

  openHeaderSearch(): void {
    const headerSearch: any = document.querySelector('.search-panel');
    if (headerSearch) {
      headerSearch.style.height = '100%';
      headerSearch.style.padding = '5px 6vmax';
    }
  }

  closeHeaderSearch(): void {
    const headerSearch: any = document.querySelector('.search-panel');
    if (headerSearch) {
      headerSearch.style.height = '';
      headerSearch.style.padding = '';
    }
  }

  toggleUserProfileMenu(switcher: boolean): void {
    if (switcher) {
      this.showUserMenu = true;
    } else {
      this.showUserMenu = false;
    }
  }

  openMobileMenu(): void {
    const mobileNav: any = document.querySelector('.nav ul');
    if (mobileNav) {
      mobileNav.style.transform = 'translateX(0)';
    }
    const mobileClickCatcher: any = document.querySelector('.mobile-click-catcher');
    if (mobileClickCatcher) {
      mobileClickCatcher.style.opacity = '1';
      mobileClickCatcher.style.pointerEvents = 'all';
    }
  }

  closeMobileMenu(): void {
    const mobileNav: any = document.querySelector('.nav ul');
    if (mobileNav) {
      mobileNav.style.transform = '';
    }
    const mobileClickCatcher: any = document.querySelector('.mobile-click-catcher');
    if (mobileClickCatcher) {
      mobileClickCatcher.style.opacity = '';
      mobileClickCatcher.style.pointerEvents = '';
    }
  }

  openNotifications(closeMobile?: boolean): void {
    this.showNotifications = true;
    closeMobile ? this.closeMobileMenu() : this.toggleUserProfileMenu(false);
  }

  logOut(): void {
    this.toggleUserProfileMenu(false);
    this.storageService.logout();
  }

  ngOnDestroy(): void {}

}
