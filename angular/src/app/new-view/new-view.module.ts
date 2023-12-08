import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NewViewRoutingModule } from './new-view-routing.module';
import { NewViewComponent } from './new-view.component';


@NgModule({
  declarations: [
    NewViewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NewViewRoutingModule
  ]
})
export class NewViewModule { }
