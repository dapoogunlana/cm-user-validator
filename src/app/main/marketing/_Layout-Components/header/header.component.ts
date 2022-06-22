import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marketing-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class MarketingHeaderComponent implements OnInit, OnDestroy {

  constructor(private router: Router) { }

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

  goHome(): void {
    this.router.navigateByUrl('/');
  }

  ngOnDestroy(): void {}

}
