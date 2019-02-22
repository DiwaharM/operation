import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkOrder } from './../../shared/workorder.model';
import { WorkOrderService } from './../work-order.service';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource , MatSort} from '@angular/material';
@Component({
  selector: 'app-view-all-workorder',
  templateUrl: './view-all-workorder.component.html',
  styleUrls: ['./view-all-workorder.component.css']
})
export class ViewAllWorkorderComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  workOrder: WorkOrder[] = [];
  matdatasource = new MatTableDataSource([]);
  constructor(private workOrderService: WorkOrderService,  private router: Router) { }

  ngOnInit() {
    this.getAllWorkOrder();
  }
  getAllWorkOrder() {
    this.workOrderService.allWorkOrder().subscribe(data => {
      this.workOrder = data;
      this.matdatasource.data = data;
      this.matdatasource.paginator = this.paginator;
    }, error => {
      console.log(error);
    }
    );
  }
  createProfomaInvoice(row) {
    this.router.navigate(['proformainvoice/createproformainvoice'
    , row.leadID, row._id]);
  }
  viewProfomaInvoice(row) {
    this.router.navigate(['proformainvoice/viewproformainvoice', row.workOrderID]);
  }
  viewInvoice(row) {
    this.router.navigate(['invoice/viewinvoice',
    row.workOrderID]);
  }
  createInvoice(row) {
    this.router.navigate(['invoice/createinvoice', row.leadID, row._id]);
  }
  getViewWorkOrder(data) {
    this.router.navigate(['workorder/viewsingleworkorder', data._id]);
  }
  getInvoice(data) {
    this.router.navigate(['createinvoice', data.leadID, data._id]);
  }
  getEditWorkOrder(data) {
    this.router.navigate(['workorder/editworkorder', data._id]);
  }
  getDeleteSingleWorkOrder(row) {
    this.workOrderService.deleteSingleWorkOrder(row._id).subscribe(data => {
      this.workOrder = data;
      this.matdatasource.data = data;
      this.matdatasource.paginator = this.paginator;
    }, error => {
      console.log(error);
    });
  }
}
