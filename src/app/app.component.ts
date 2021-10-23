import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from './customer';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 public customer: Customer[];
 public one_customer: Customer;
 public editcustomer: Customer;
 public deleteCustomer: Customer;

 constructor(private customerService: CustomerService){}

 ngOnInit(){
 this.getCustomers();
 }

 public getCustomers():void{
   this.customerService.getCustomer().subscribe(
     (Response: Customer[]) => {
     this.customer= Response;
   },
   (error: HttpErrorResponse) =>{
     alert(error.message);
   }
   );
  
  }

  public onAddCustomer(addForm: NgForm): void {
    this.customerService.addCustomer(addForm.value).subscribe(
      (response: Customer) => {
        console.log(response);
        this.getCustomers();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateCustomer(customer: Customer): void {
    this.customerService.updateCustomer(customer).subscribe(
      (response: Customer) => {
        console.log(response);
        this.getCustomers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteCustomer(customer: Customer): void {

    this.customerService.deleteCustomer(customer.id).subscribe(
      (response: void) => {
        console.log(response);
        this.getCustomers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchCustomer(key: string): void {
    console.log(key);
    const results: Customer[] = [];
    for (const c of this.customer) {
      if (c.customerName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || c.customerAddress.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(c);
      }
    }
    this.customer = results;
    if (results.length === 0 || !key) {
      this.getCustomers();
    }
  }

  public onOpenModal(customer: Customer,mode: string): void{
    const containter = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    
    if(mode === 'add'){
      button.setAttribute('data-target','#addCustomerModal');
    }

    if(mode === 'edit'){
      this.editcustomer = customer
      button.setAttribute('data-target','#updateCustomerModal');
    }

    if(mode === 'delete'){
      this.deleteCustomer = customer;
      button.setAttribute('data-target','#deleteCustomerModal');
    }
    containter?.appendChild(button);
    button.click();
  }

}
