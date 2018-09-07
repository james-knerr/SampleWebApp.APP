import { Component } from '@angular/core';
import { Router, Scroll, Event, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {AppInsights} from 'applicationinsights-js';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public pageTitle = '';
  public loadingRoute = false;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _titleService: Title) {
      if (!AppInsights.config) {
        AppInsights.downloadAndSetup({ instrumentationKey: environment.appInsightsKey });
      }
    this._router.events.subscribe(
      (event: Event) => {
        this.loadingRoute = true;
        if (event instanceof NavigationEnd || (event as Scroll).routerEvent instanceof NavigationEnd) {
          this.loadingRoute = false;
          let currentRoute = this._activatedRoute.root;
          while (currentRoute.children[0] !== undefined) {
            currentRoute = currentRoute.children[0];
          }
          const data = currentRoute.snapshot.data;
          this.pageTitle = JSON.parse(JSON.stringify(data)).title;
          this._titleService.setTitle(this.pageTitle);
        }
      });
  }
}


