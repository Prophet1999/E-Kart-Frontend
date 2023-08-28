import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CustomerCart } from "src/app/shared/model/customerCart";


@Injectable({
    providedIn: 'root'
})

export class CustomerCartService {
    
    private headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    constructor(private http: HttpClient) { }

    
    getCustomerCart(customerEmailId: any) {
        let url: string = environment.customerCartUrl + "/customer/" + customerEmailId + '/products/';
        return this.http.get<CustomerCart[]>(url)
            .pipe(catchError(this.handleError));
    }
    
    deleteProductFromCart(cart: CustomerCart, customerEmailId: string) {
        
        let url: string = environment.customerCartUrl + "/customer/" + customerEmailId + "/product/" + cart.product.productId;
        console.log(url);
        return this.http.delete<string>(url)
        .pipe(
            catchError(this.handleError)
        )

    }

    updateCart(cart: CustomerCart): Observable<string> {
        let url: string = environment.customerCartUrl + "/customerCarts";
        return this.http.put(url, cart, {responseType: 'text' })
            .pipe(catchError(this.handleError));
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
                errMsg = "A connection to back end can not be established.";
            } else {
                errMsg = err.error.message;
            }
        }
        return throwError(errMsg);
    }

}