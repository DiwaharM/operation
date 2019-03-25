import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseManagementService } from './../expense-management.service';
import { Expense } from '../../shared/expense.model';
import { Router } from '@angular/router';

import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-view-expense',
  templateUrl: './view-expense.component.html',
  styleUrls: ['./view-expense.component.css']
})
export class ViewExpenseComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  matdatasource = new MatTableDataSource([]);
  customerDetailsForm: FormGroup;
  customerModel: any;
  expenseValue: Expense;


  expenseModel: any;
  customerValue: Expense[];
  public pageSize = 50;
  public currentPage = 0;
  public totalSize = 0;

  public array: any;
  public displayedColumns = ['', '', '', '', ''];
  public dataSource: any;
  mobileValue;
  emailValue;
  nameValue;
  cityValue;
  ExpenseType = ['Shoot', 'Others'];


  constructor(private fb: FormBuilder,
    private expenseManagementService:
      ExpenseManagementService,
    private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.createForm();
    this.getAllExpense();
  }
  createForm() {
    this.customerDetailsForm = this.fb.group({

      srchterm: [''],
      fromDate: [''],
      toDate: [''],

      mobileNumber: ['', Validators.required],
      name: ['', Validators.required],
      companyName: ['', Validators.required],
      expenseType: ['', Validators.required],
      modeOfPayment: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required],
      totalAmount: ['', Validators.required],
      paid: ['', Validators.required],
      balance: ['', Validators.required],
      vouNo: ['', Validators.required],
      expensesDescription: ['', Validators.required]
    });
  }
  addExpense() {
    this.router.navigate(['expense/createExpense']);
  }
  getDeleteExpense(row) {
    /*  row.editing = false;
     customerDetailsForm.reset(); */
    this.expenseManagementService.deleteExpense(row).subscribe(data => {
      this.customerModel = data;
      this.matdatasource.data = data;
      this.matdatasource.paginator = this.paginator;
    }, error => {
      console.log(error);
    });
  }

  getViewExpense(data) {
    this.router.navigate(['expense/singleViewExpense', data._id]);
  }

  getEditExpense(row) {
    this.router.navigate(['expense/editExpense', row._id]);
  }
  getAllExpense() {
    this.expenseManagementService.allExpense().subscribe(data => {
      this.customerValue = data;
      this.customerModel = new MatTableDataSource<Expense>(data);
      this.customerModel.paginator = this.paginator;
      this.customerModel = data;
      this.getTotal();
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
    }, error => {
      console.log(error);
    });
  }
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.customerModel = part;
  }
  searchBy(value) {
    this.nameValue = value;
  }
  updateExpense(customerDetailsForm: FormGroup, row) {
    this.expenseManagementService.editExpense(row).subscribe(data => {
      this.customerModel = data;
      this.customerValue = data;
      this.getTotal();
    }, error => {
      console.log(error);
    });
  }
  SearchByType(row) {
    this.customerModel = new Expense();
    this.customerModel.expenseType = row;
    console.log(this.customerModel);
    this.expenseManagementService.typeFilter(this.customerModel).subscribe(data => {
      this.customerModel = data;
      this.customerValue = data;
      this.getTotal();
    }, error => {
      console.log(error);
    });

  }



  searchByDate(customerDetailsForm: FormGroup) {

    this.customerModel = new Expense();
    this.customerModel.fromDate = customerDetailsForm.controls.fromDate.value;
    this.customerModel.toDate = customerDetailsForm.controls.toDate.value;

    this.expenseManagementService.dateFilter(this.customerModel).subscribe(data => {
      this.customerModel = data;
      this.customerValue = data;
      this.getTotal();

    }, error => {
      console.log(error);
    });
  }
  getTotal() {
    let tot = 0;
    this.customerValue.forEach(element => {
      tot += element.totalAmount;
    });
    this.getBalance();
    this.getPaid();
    return tot;
  }
  getPaid() {
    let paid = 0;
    this.customerValue.forEach(element => {
      paid += element.paid;
    });
    return paid;
  }
  getBalance() {
    let bal = 0;
    this.customerValue.forEach(element => {
      bal += element.balance;
    });
    return bal;
  }
}
