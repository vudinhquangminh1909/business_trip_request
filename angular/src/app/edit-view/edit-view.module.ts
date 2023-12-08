import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { EditViewRoutingModule } from './edit-view-routing.module';
import { EditViewComponent } from './edit-view.component';


@NgModule({
  declarations: [
    EditViewComponent
  ],
  imports: [
    ToastrModule.forRoot(),
    CommonModule,
    ReactiveFormsModule,
    EditViewRoutingModule
  ]
})
export class EditViewModule { }
