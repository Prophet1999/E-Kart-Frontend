import { Component, ComponentFactoryResolver, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Customer } from "src/app/shared/model/customer";
import { CustomerCart } from "src/app/shared/model/customerCart";
import { CustomerHomeService } from "./customer-home.service";
import { CustomerSharedService } from "./customer-shared-service";


@Component({
    selector: 'customer-home',
    templateUrl: './../customer-home/customer-home.component.html',
    styleUrls: ['./customer-home.component.css']

})
export class CustomerHomeComponent {
    isViewProductSelected: boolean = false;
    isRouting: boolean = false;
    optionSelected!: string;
    loggedInCustomer: Customer;
    searchText!: string;
    cart: CustomerCart[] = [];
    sStr: string = '';

    constructor(private router: Router, private route: ActivatedRoute,
        private customerHomeService: CustomerHomeService, private customerSharedService: CustomerSharedService) {
        customerSharedService.loggedInCustomer.subscribe((custName) => {
            this.loggedInCustomer = custName
        })
    }

    ngOnInit() {
        
        this.getLoggedInCustomer();
        this.getCustomerCart();
    }
    getLoggedInCustomer() {
       

        let temp!: any;
        temp = sessionStorage.getItem('customer');
        this.customerSharedService.updatedCustomer()
        // this.customerSharedService.updatedCustomer().subscribe(customer => this.loggedInCustomer = customer);
        // this.loggedInCustomer = JSON.parse(temp);


        //this.loggedInCustomer = JSON.parse(sessionStorage.getItem('customer')?sessionStorage.getItem('customer'):'xyz');
    }

    getCustomerCart() {

        this.customerSharedService.updatedCartList.subscribe(cartList => this.cart = cartList)
        this.customerHomeService.getCustomerCart(this.loggedInCustomer.emailId).subscribe(
            cart => {
                this.cart = cart;
                sessionStorage.setItem("cart", JSON.stringify(this.cart));
                // this.customerSharedService.updatedCartList.subscribe(cartList => this.cart = cartList)
                this.customerSharedService.updateCartList(this.cart)
            }, err => {
                this.cart=[];
                // sessionStorage.setItem("cart", JSON.stringify(this.cart));
                this.customerSharedService.updateCartList(this.cart);
                this.customerSharedService.updatedCartList.subscribe(cartList => this.cart = cartList)
            }
        )
      }

    logout() {
        sessionStorage.clear();
        this.router.navigate([""])
    }
}