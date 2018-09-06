import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module/shared.module';
import { MainRoutingModule } from './main-routing.module';

import { MainService } from './main.service';

import { MainPageComponent } from './main-page.component/main-page.component';
import { MainDashboardComponent } from './main-dashboard.component/main-dashboard.component';

@NgModule({
  imports: [
    SharedModule,
    MainRoutingModule
  ],
  declarations: [MainPageComponent, MainDashboardComponent],
  providers: [MainService]
})
export class MainModule { }
