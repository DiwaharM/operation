import { Component, OnInit, Inject, Optional, Input } from '@angular/core';
import { Expense } from '../../shared/expense.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseManagementService } from './../expense-management.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css']
})
export class CreateExpenseComponent implements OnInit {
  expenseDetailsForm: FormGroup;
  expenseModel: Expense;
  editable = true;
  expenseType;
  modeOfPayment;
  Paymode;
  gstType;
  constructor(private fb: FormBuilder,
    @Optional() public dialogRef: MatDialogRef<CreateExpenseComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private expenseManagementService: ExpenseManagementService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }


  ngOnInit() {
    this.createForm();
    this.getExpense();
  }
  getExpense(){
    this.expenseManagementService.allsttExpense().subscribe(data =>{
      this.expenseModel = data;
      this.expenseType = this.expenseModel[0].expenseType;
      this.modeOfPayment = this.expenseModel[0].modeOfPayment;
      this.gstType = this.expenseModel[0].gst;
    });
  }

  createForm() {
    this.expenseDetailsForm = this.fb.group({
      mobileNumber: ['', Validators.required],
      name: ['', Validators.required],
      companyName: ['', Validators.required],
      expenseType: [''],
      modeOfPayment: [''],
      location: [''],
      date: [''],
      totalAmount: ['', Validators.required],
      paid: ['', Validators.required],     
      vouNo: ['', Validators.required],
      expensesDescription: ['', Validators.required],
      gst: ['', Validators.required]
    });
  }
  cancel() {
    this.router.navigate(['expense/viewExpense']);
  }
  addSingleExpense(expenseDetailsForm: FormGroup) {
    this.expenseModel = new Expense();
     this.expenseModel.mobileNumber = expenseDetailsForm.controls.mobileNumber.value,
     this.expenseModel.name = expenseDetailsForm.controls.name.value,
     this.expenseModel.companyName = expenseDetailsForm.controls.companyName.value,
     this.expenseModel.expenseType = expenseDetailsForm.controls.expenseType.value,
     this.expenseModel.modeOfPayment = expenseDetailsForm.controls.modeOfPayment.value,
     this.expenseModel.location = expenseDetailsForm.controls.location.value,
     this.expenseModel.date = expenseDetailsForm.controls.date.value,
     this.expenseModel.totalAmount = expenseDetailsForm.controls.totalAmount.value,
     this.expenseModel.paid = expenseDetailsForm.controls.paid.value,
     this.expenseModel.vouNo = expenseDetailsForm.controls.vouNo.value,
     this.expenseModel.expensesDescription = expenseDetailsForm.controls.expensesDescription.value,
     this.expenseModel.gst = expenseDetailsForm.controls.gst.value
    this.expenseManagementService.addSingleExpense(this.expenseModel).subscribe(data => {
      this.expenseModel = data;
      this.router.navigate(['expense/viewExpense']);
    }, error => {
      console.log(error);
    });
    this.router.navigate(['expense/viewExpense']);
  }
}
