import { Component, OnInit, Input } from '@angular/core';
import { CartProduct } from 'src/app/shared/model/cartProduct';
import { Customer } from 'src/app/shared/model/customer';
import { CustomerCart } from 'src/app/shared/model/customerCart';
import { Product } from 'src/app/shared/model/product';
import { CustomerCartService } from '../../customer-cart/customer-cart.service';
import { CustomerSharedService } from '../../customer-shared-service';

@Component({
  selector: 'app-customer-product-details',
  templateUrl: './customer-product-details.component.html',
  styleUrls: ['./customer-product-details.component.css']
})

export class CustomerProductDetailsComponent implements OnInit {

  @Input()
  selectedProduct: Product;
  errorMessage: string;
  successMessage: string;

  constructor(private customerCommonService: CustomerSharedService, private customerCartService: CustomerCartService) { }

  ngOnInit(): void {
  }
  addToCart(){
    console.log("IN ADD TO CART")
        this.successMessage = "";
        this.errorMessage = "";
        let cart:CustomerCart[] = JSON.parse(sessionStorage.getItem("cart") || "[]");;
        if(cart==null){
            cart = [];
        }
        let customer: Customer = JSON.parse(sessionStorage.getItem("customer") || "{}");
        let cartToAdd: CustomerCart = new CustomerCart();
        let cartProd: CartProduct=new CartProduct();
        cartToAdd.customerEmailId=customer.emailId;
        cartProd.quantity=1;
        
        let prod:Product= new Product();
        prod.productId=this.selectedProduct.productId;
        cartProd.product=prod;

        cartToAdd.cartProducts=[cartProd];
        

        cartToAdd.customerEmailId = customer.emailId
        cartToAdd.quantity = 1;
        cartToAdd.product = this.selectedProduct;
        let alreadyAddedToCart:boolean = (cart.filter(c=>c.product.productId==this.selectedProduct.productId)).length != 0;
        
        if(alreadyAddedToCart){
            this.errorMessage = "Already added to Cart. Go to cart for modifying your selection."
        } else{
            cart.push(cartToAdd);
            this.customerCommonService.updateCartList(cart)
            sessionStorage.setItem("cart", JSON.stringify(cart));
            this.customerCommonService.addProductToCart(cartToAdd).subscribe((response)=>{
                this.successMessage=response;
            }, (error)=>{
                this.errorMessage = error?.error?.message;
            })
        }
    }
}