import { Component, OnInit } from '@angular/core';
import {AppInsights} from 'applicationinsights-js';

import { MainService } from '../main.service';
import { SnackBarService } from '../../core.module/services/snackbar.service';
import { SampleVM } from '../../shared.module/models/sample-vm';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {
  public samples: SampleVM[];
  public newSampleText = '';
  public isNewSampleVisible = false;
  public isBusy = false;
  public currentDate: Date = new Date();

  constructor(private _mainService: MainService,
              private _snackbarService: SnackBarService
            ) {
              AppInsights.trackPageView('Dashboard', window.location.href);

  }

  ngOnInit() {
    this.getSamples();
  }

  private getSamples(forceRefresh?: boolean) {
    this.isBusy = true;
    this._mainService.getSamples(forceRefresh)
    .subscribe(k => {
      this.samples = k;
      this.isBusy = false;
    }, err => {
      this._snackbarService.open('error', err, 'OK');
      this.isBusy = false;
    });
  }

public refresh(event: any) {
  this.getSamples(true);
}
  public newSample(event: any) {
    this.newSampleText = '';
    this.isNewSampleVisible = true;
  }

  public saveNewSample() {
    this.isBusy = true;
    this._mainService.addSample(new SampleVM(this.newSampleText))
      .subscribe(k => {
        this.samples.push(k);
        this.resetNewSample();
        this.isBusy = false;
      }, err => {
        this._snackbarService.open('error', err, 'OK');
        this.isBusy = false;
      });
  }

  public resetNewSample() {
    this.newSampleText = '';
    this.isNewSampleVisible = false;
}


}
