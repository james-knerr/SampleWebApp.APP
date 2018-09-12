import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CacheService } from 'ng2-cache';
import {AppInsights} from 'applicationinsights-js';

import { ConfigurationService } from '../core.module/services/configuration.service';
import { ErrorHandlerService } from '../core.module/services/error-handler.service';

import { cacheKeys } from '../app.constants';
import { environment } from '../../environments/environment';
import { Utilities } from '../shared.module/utilities/general-utilities';

import { SampleVM } from '../shared.module/models/sample-vm';

@Injectable()
export class MainService {

    private appInsightsEventID = '';
    private apiUrl = environment.apiServer + '/samples';

    constructor(
        private _httpClient: HttpClient,
        private _errorService: ErrorHandlerService,
        private _configService: ConfigurationService,
        private _cacheService: CacheService) {
            if (!AppInsights.config) {
                AppInsights.downloadAndSetup({ instrumentationKey: environment.appInsightsKey,
                enableCorsCorrelation: true });
              }
        }

    public getSamples(forceRefresh?: boolean): Observable<SampleVM[]> {
        this.appInsightsEventID = Utilities.NewGuid();
        const cacheKey = cacheKeys.samples;
        if (this._cacheService.exists(cacheKey) && !forceRefresh) {
             return of(this._cacheService.get(cacheKey));
         } else {
            AppInsights.trackEvent('APP - GetSamples() - Start', { ID: this.appInsightsEventID});
        return this._httpClient.get<SampleVM[]>(`${this.apiUrl}`)
        .pipe(map((resp: SampleVM[]) => {
            this._cacheService.set(cacheKey, resp, { maxAge: this._configService.maxAge });
            AppInsights.trackEvent('APP - GetSamples() - End', { ID: this.appInsightsEventID});
            return resp;
        }),
        catchError(this._errorService.handleError('getSamples', this.appInsightsEventID, [])));
    }
    }
    public addSample(sample: SampleVM): Observable<SampleVM> {
        return this._httpClient.post<SampleVM>(`${this.apiUrl}`, sample)
        .pipe(map((resp: SampleVM) => {
            const cacheKey = cacheKeys.samples;
            const cacheValue = <SampleVM[]>this._cacheService.get(cacheKey);
            cacheValue.push(resp);
            this._cacheService.set(cacheKey, cacheValue, { maxAge: this._configService.maxAge });
            return resp;
        }));
    }
}
