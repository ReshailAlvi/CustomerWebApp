import { Injectable } from "@angular/core";
import { Observable } from "rxjs"
import { Customer } from "./customer";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class CustomerService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getCustomer(): Observable<Customer[]>{
        return this.http.get<Customer[]>(`${this.apiServerUrl}/getcustomers`);
    }    

    public addCustomer(customer: Customer): Observable<Customer>{
        return this.http.post<Customer>(`${this.apiServerUrl}/addcustomer`, customer);
    }   

    public updateCustomer(customer: Customer): Observable<Customer>{
        return this.http.put<Customer>(`${this.apiServerUrl}/updatecustomer/${customer.id}`, customer);
    }   

    public deleteCustomer(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/deletecustomer/${id}`);
    }  
}

