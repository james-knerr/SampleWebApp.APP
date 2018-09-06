import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import {
  MatSnackBarModule,
  MatSnackBar
} from '@angular/material';
import { CacheService } from 'ng2-cache';

import { ConfigurationService } from './services/configuration.service';
import { SnackBarService } from './services/snackbar.service';
import { ErrorHandlerService } from './services/error-handler.service';

@NgModule({
  imports: [MatSnackBarModule],
  declarations: [],
  providers: [MatSnackBar, ConfigurationService, CacheService, SnackBarService, ErrorHandlerService]
})
export class CoreModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [MatSnackBar, ConfigurationService, CacheService, SnackBarService, ErrorHandlerService]
    };
  }

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
