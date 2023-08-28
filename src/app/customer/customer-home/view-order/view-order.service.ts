import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ViewOrderService {



  constructor(private http: HttpClient) { }

  getOrders(emailId: any): Observable<any>{
    let url : string = environment.orderAPIurl + "/customer/" + emailId;
    return <Observable<any>>(this.http.get(url).pipe(catchError(this.handleError)))
  }
//   getAddress(addressId: any): Observable<any> {
//     let url : string = environment.customerAPIUrl + "/addresses/" + addressId;
//     return <Observable<any>>(this.http.get(url).pipe(catchError(this.handleError)))
//   }

  private handleError(err: HttpErrorResponse) {
    console.log(err)
    let errMsg: string = '';

    if (err.status == 400) {
        errMsg = "The request can not be processed at the moment. Please try again later or connect with admin!!";
    } else if (err.status == 404) {
        errMsg = "The resources you are looking for is not available. Please try again later or connect with admin!!";
    } else {
        if (err.error instanceof Error) {

            errMsg = err.error.message;

            console.log(errMsg)
        }
        else if (typeof err.error === 'string') {
            alert("I am in error")
            errMsg = JSON.parse(err.error).errorMessage
        }
        else {
            if (err.status == 0) {
                errMsg = "A connection to back end can not be established.";
            } else {
                errMsg = err.error.message;
            }
        }
    }
    return throwError(errMsg);
}
}