import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationService {

    /* CACHE CONFIGS */
    public BUILD_VERSION = 'v0.0.1';
    public maxAge: number = 5 * 60; // in seconds
    /* CACHE CONFIGS */

}
