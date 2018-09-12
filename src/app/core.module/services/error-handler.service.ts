import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {AppInsights} from 'applicationinsights-js';

@Injectable()
export class ErrorHandlerService {

    constructor() {}

    public handleError<T> (operation = 'operation', appInsightsID?: string, result?: T) {
        return (error: any): Observable<T> => {

          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead

          // TODO: better job of transforming error for user consumption
          console.log(`${operation} failed: ${error.message}`);

          if (appInsightsID) {
            AppInsights.trackEvent('Exception', { Source: 'APP', Method: 'GetSamples()', ID: appInsightsID});
          }
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }
}
