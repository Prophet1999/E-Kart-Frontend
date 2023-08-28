import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from "../../../../environments/environment";
import { catchError } from 'rxjs/operators';
import { Card } from 'src/app/shared/model/card';
import { Order } from 'src/app/shared/model/order';


@Injectable({
  providedIn: 'root'
})
export class PlaceOrderService {

  private headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
  constructor(private http : HttpClient) { }

  getCards(customerEmailId : any, cardType : string) {
    let url : string = environment.cardAPIUrl + "/customer/" + customerEmailId + '/card-type/' + cardType;
    return this.http.get<Card[]>(url).pipe(catchError(this.handleError));
  }

  placeOrder(data : any) {
    let url : string = environment.orderAPIurl + "/place-order";
    return this.http.post(url,data,{responseType : "text" as "json"}).pipe(catchError(this.handleError));
  }

  payForOrder(customerEmailId : any, orderId : any, data : any) {

    //make a post request to respective backend api to pay for the order
    
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






