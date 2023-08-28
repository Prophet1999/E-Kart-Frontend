import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CustomerSharedService } from '../customer-shared-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/model/product';
import { ViewAllProductsService } from './view-all-product.service';
import { CustomerCart } from 'src/app/shared/model/customerCart';
import { Customer } from 'src/app/shared/model/customer';


@Component({
  selector: 'app-view-all-products',
  templateUrl: './view-all-products.component.html',
  styleUrls: ['./view-all-products.component.css']
})
export class ViewAllProductsComponent implements OnInit {

  successMessage: string;
  errorMessage: string;
  productList: Product[];
  searchText: string;
  productDetail!:Product;
  viewDetails: boolean = false;
  selectedProduct: Product;

  productListToDisplay: Product[] = [];
  constructor(private viewAllProductService: ViewAllProductsService,
    private sharedService: CustomerSharedService,
    private router: Router,
    private route: ActivatedRoute) {


  }


  ngOnInit() {
    this.getAllProduct();
  }
  getAllProduct() {
    this.viewAllProductService.getAllProducts()
      .subscribe(products => {
        this.productList = products;
        this.productListToDisplay = this.productList;
      }
      );


  }
  setSelectedProduct(product: Product) {
    
    // this.router.navigate(['customer-product/'+product.productId])
    this.viewDetails = true;
    this.selectedProduct = product;
  }




  search() {
    this.searchText=this.searchText.toLowerCase()
    if (this.searchText) {
      this.productListToDisplay = this.productList.filter(product => {
        return product.brand.toLowerCase().indexOf(this.searchText) != -1 || product.name.toLowerCase().indexOf(this.searchText) != -1
      });
    } else {
      this.productListToDisplay = this.productList;
    }

  }

  clear() {
    this.productListToDisplay = this.productList;
    this.searchText = "";
  }

  addToCart(product: Product) {
    this.successMessage = '';
    this.errorMessage = '';
    let cart: CustomerCart = new CustomerCart();
    let customer: any = sessionStorage.getItem("customer");

    cart.customerEmailId = customer.emailId;
    cart.cartProducts = customer.productId;
    product.quantity = 1;

    this.viewAllProductService.addToCart(cart).subscribe(
      cartFromDB => {
        //cartFromDB.successMessage;
        this.successMessage = "Success msg";
      }, error => this.errorMessage = <any>error
    )
  }

}
