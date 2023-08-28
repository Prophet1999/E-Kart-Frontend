import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerCart } from 'src/app/shared/model/customerCart';
import { CustomerSharedService } from '../customer-shared-service';
import { CustomerCartService } from './customer-cart.service';

@Component({
  selector: 'app-customer-cart',
  templateUrl: './customer-cart.component.html',
  styleUrls: ['./customer-cart.component.css']
})

export class CustomerCartComponent implements OnInit {

  cartList: CustomerCart[] = [];
  selectedCartProduct: CustomerCart;
  viewCartProductDetails: boolean = false;
  successMessage: any;
  errorMessage: any;
  loggedInCustomer: any;
  
  constructor(private router: Router, private customerCartService: CustomerCartService, private customerSharedService: CustomerSharedService) { }

  ngOnInit(): void {
    this.loggedInCustomer = JSON.parse(sessionStorage.getItem("customer") || "{}");
    this.customerCartService.getCustomerCart(this.loggedInCustomer.emailId).subscribe(
      cart => {
          this.cartList = cart;
          console.log(this.cartList)
          sessionStorage.setItem("cart", JSON.stringify(this.cartList));
          // this.customerSharedService.updatedCartList.subscribe(cartList => this.cartList = cartList)
          this.customerSharedService.updateCartList(this.cartList)
      }, err => {
          // this.customerSharedService.updatedCartList.subscribe(cartList => this.cartList = cartList)
      }
  )
  this.viewCartProductDetails = false;
  }

  setSelectedCart(cart: CustomerCart) {
    this.successMessage = "";
    this.errorMessage = "";
    this.viewCartProductDetails = true;
    this.selectedCartProduct = cart;
  }

  getCustomerCart(){
    this.customerCartService.getCustomerCart(this.loggedInCustomer.emailId).subscribe(
      cart => {
        this.cartList = cart;
        sessionStorage.setItem("cart", JSON.stringify(this.cartList));
        this.customerSharedService.updateCartList(this.cartList)
      }, err => {
        this.customerSharedService.updatedCartList.subscribe(cartList => this.cartList = cartList)
      }
    )
  }

  deleteProductFromCart(cart: CustomerCart) {
    this.successMessage=null;
    this.errorMessage=null;
    this.customerCartService.deleteProductFromCart(cart, this.loggedInCustomer.emailId).subscribe((message)=>{
      this.cartList=this.cartList.filter(item =>item.cartId!==cart.cartId);
      this.customerSharedService.updateCartList(this.cartList);
      sessionStorage.setItem("cart", JSON.stringify(this.cartList));
      this.getCustomerCart();
      this.successMessage=message;
    },(err)=>{
      this.cartList=this.cartList.filter(item =>item.cartId!==cart.cartId);
      this.customerSharedService.updateCartList(this.cartList);
      sessionStorage.setItem("cart", JSON.stringify(this.cartList));
      this.getCustomerCart();
      // this.successMessage=message;
      this.errorMessage=<any>err;
    })
    //write a logic to delete the item from the customer cart
    //by calling deleteProductFromCart() of CustomerCartService

  }

  placeOrder(cart : CustomerCart[]){
    this.router.navigate(["/home/placeOrder"]);
  }

  continueShopping(){
   this.router.navigate(["/home/products"]);
  }

}