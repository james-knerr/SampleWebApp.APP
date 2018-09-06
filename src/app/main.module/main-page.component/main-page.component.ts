import { Component } from '@angular/core';
import { Router, Event, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  public selectedMenuItem = '';
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {
    this._router.events.subscribe(
      (event: Event) => {
        if (event instanceof NavigationEnd) {
          let currentRoute = this._activatedRoute.root;
          while (currentRoute.children[0] !== undefined) {
            currentRoute = currentRoute.children[0];
          }
          const data = currentRoute.snapshot.data;
          this.selectedMenuItem = JSON.parse(JSON.stringify(data)).menuItem;
        }
      });
  }

  public isMenuItemSelected(menuItemName: string): boolean {
    if (this.selectedMenuItem && this.selectedMenuItem.includes(menuItemName)) {
      return true;
    }
    return false;
  }
}
