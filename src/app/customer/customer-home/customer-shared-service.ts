import { Injectable } from "@angular/core";
import { BehaviorSubject, throwError, Observable, Subject } from "rxjs";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { CustomerCart } from "src/app/shared/model/customerCart";
import { Customer } from "src/app/shared/model/customer";
import { Card } from "src/app/shared/model/card";
import { Product } from "src/app/shared/model/product";


@Injectable({
    providedIn: 'root'
})

export class CustomerSharedService {
    temp!: any;
    constructor(private http: HttpClient){
        this.temp=JSON.stringify(sessionStorage.getItem('customer'));        
    }

    private cartList = new Subject<CustomerCart[]>();
    updatedCartList = this.cartList.asObservable();

    private cardList = new Subject<Card[]>();
    updatedCardList = this.cardList.asObservable();


    customerdata:Customer;
    public loggedInCustomer = new Subject<Customer>();

    updatedCustomer(){
        let customerData:any=sessionStorage.getItem('customer');
        customerData = JSON.parse(customerData)
        
        this.loggedInCustomer.next(customerData)          
    } 

    updatedCustomerDetails(customer: Customer) {
        this.loggedInCustomer.next(customer);
    }
    
    updateCartList(cartList: CustomerCart[]) {
        this.cartList.next(cartList);
    }

    updateCardList(cardList: Card[]) {
        this.cardList.next(cardList);
    }

    addProductToCart(cart: CustomerCart){
        
        console.log("ADDED TO CART")
        //make a post request to respective backend api to add the item to the customer cart
        return this.http.post(environment.customerCartUrl+"/products" , cart, {
            responseType : 'text'
        });
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err)
        let errMsg: string = '';
        if (err.error instanceof Error) {
            errMsg = err.error.message;
            console.log(errMsg)
        }
        else if (typeof err.error === 'string') {
            errMsg = JSON.parse(err.error).errorMessage
        }
        else {
            if (err.status == 0) {
                errMsg = "Connection to back end can not be established.";
            } else {
                errMsg = err.error.message;
            }
        }
        return throwError(errMsg);
    }

}