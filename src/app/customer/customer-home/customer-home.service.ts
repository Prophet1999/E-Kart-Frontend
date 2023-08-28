import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { environment } from "../../../environments/environment";
import { catchError } from 'rxjs/operators';
import { CustomerCart } from "src/app/shared/model/customerCart";




@Injectable({
    providedIn: 'root'
})
export class CustomerHomeService {
    private headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    constructor(private http: HttpClient) { }
    getCustomerCart(emailId: string): Observable<CustomerCart[]> {
        let url: string = environment.customerCartUrl + "/customer/" + emailId + "/products";
        return this.http.get<CustomerCart[]>(url)
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