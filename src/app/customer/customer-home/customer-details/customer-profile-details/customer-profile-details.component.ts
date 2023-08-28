import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/shared/model/customer';
import { CustomerSharedService } from '../../customer-shared-service';
import { CustomerProfileService } from './costomer-profile.service';

@Component({
  selector: 'app-customer-profile-details',
  templateUrl: './customer-profile-details.component.html',
  styleUrls: ['./customer-profile-details.component.css']
})
export class CustomerProfileComponent implements OnInit {
  customer: Customer;
  updating: string = "";
  customerToUpdate: Customer;

  errorMessage: string = "";
  successMessage: string = "";

  constructor(private SellerProfileService: CustomerProfileService,
      private router: Router,
      private route: ActivatedRoute,
      private customerSharedService: CustomerSharedService
  ) {


  }
  ngOnInit() {
      this.customer = JSON.parse(sessionStorage.getItem("customer") || "{}");
      this.customerToUpdate = Object.assign({}, this.customer);
  }

  linkClick(value: string) {
      this.updating = value;
      this.errorMessage = "";
      this.successMessage = "";
  }

  updateDetail(action: string) {
      this.errorMessage = "";
      this.successMessage = "";
      if (action == "update") {
          this.SellerProfileService.updateCustomerDetails(this.customerToUpdate).subscribe(
              (response) => {
                  this.successMessage = response;
                  this.customer = this.customerToUpdate;
                  this.customerSharedService.updatedCustomerDetails(this.customerToUpdate);
                  sessionStorage.setItem("customer", JSON.stringify(this.customerToUpdate));
                  this.updating = "";
                  this.router.navigate(["home/details"]);
              }, error => {
                  this.errorMessage = <any>error;
                  Object.assign(this.customerToUpdate,this.customer);
              }

          )
      } else {
          this.updating = "";
          Object.assign(this.customerToUpdate,this.customer);
      }
  }


}