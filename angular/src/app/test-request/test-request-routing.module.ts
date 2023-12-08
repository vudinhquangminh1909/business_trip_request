import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestRequestComponent } from './TestRequestComponent';

const routes: Routes = [{ path: '', component: TestRequestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRequestRoutingModule { }
