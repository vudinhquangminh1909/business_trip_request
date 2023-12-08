import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewViewComponent } from './new-view.component';

const routes: Routes = [{ path: '', component: NewViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewViewRoutingModule { }
