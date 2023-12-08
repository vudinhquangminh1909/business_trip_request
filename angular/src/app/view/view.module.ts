import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ViewRoutingModule } from './view-routing.module';
import { ViewComponent } from './view.component';


@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ViewRoutingModule
  ]
})
export class ViewModule { }
