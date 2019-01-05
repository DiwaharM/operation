import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'customers',
    loadChildren: './customer-management/customer.module#CustomersModule'
  },
  {
    path: 'lead',
    loadChildren: './lead-management/lead-management.module#LeadManagementModule'
  },
  {
    path: 'workorder',
    loadChildren: './work-order-management/work-order-management.module#WorkOrderManagementModule'
  },
  {
    path: 'quotation',
    loadChildren: './quotation-management/quotation-management.module#QuotationManagementModule'
  },
  {
    path: 'invoice',
    loadChildren: './invoice-management/invoice-management.module#InvoiceManagementModule'
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
