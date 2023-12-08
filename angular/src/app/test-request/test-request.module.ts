import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


import { TestRequestRoutingModule } from './test-request-routing.module';
import { TestRequestComponent } from './TestRequestComponent';


@NgModule({
  declarations: [
    TestRequestComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    TestRequestRoutingModule
  ]
})
export class TestRequestModule { }
