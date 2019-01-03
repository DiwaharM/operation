import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CreateWorkorderComponent } from './create-workorder/create-workorder.component';
import { ViewSingleWorkorderComponent } from './view-single-workorder/view-single-workorder.component';
import { EditWorkorderComponent } from './edit-workorder/edit-workorder.component';
import { ViewWorkorderComponent } from './view-workorder/view-workorder.component';

const routes: Routes = [
  {
    path: 'createworkorder',
    component: CreateWorkorderComponent
  },
  {
  path: 'viewsingleworkorder/:leadId/:workId',
  component: ViewSingleWorkorderComponent
},
{
  path: 'editworkorder/:leadId/:workId',
  component: EditWorkorderComponent
},
{
  path: 'viewworkorder/:leadId',
  component: ViewWorkorderComponent
},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkOrderRoutingModule { }
