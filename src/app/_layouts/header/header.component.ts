import { Component, Input } from '@angular/core';
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})

export class HeaderComponent {

  isAuthenticated: boolean;

  appTitle = 'Welcome to Chroma';
  list: any;
  selected: any;
  isOffcanvas = true;

  @Input() public hasSideNav: boolean;

  // Main Nav Links Array
  constructor(
    public oktaAuth: OktaAuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string

  ) {
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );
    this.list = [''];
  }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }

  logout() {
    this.oktaAuth.logout('/');
  }

  select(item) {
    this.selected = item;
  }

  isActive(item) {
    return this.selected === item;
  }

  
  // Scroll To Top When Route Changes
  onActivate(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      const scrollToTop = window.setInterval(() => {
        const pos = window.pageYOffset;
        if (pos > 0) {
          window.scrollTo(0, pos - 50); // how far to scroll on each step
        } else {
          window.clearInterval(scrollToTop);
        }
      }, 10);
    }
  }
}
