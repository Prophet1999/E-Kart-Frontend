import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomerLandingPageComponent } from './customer-landing-page/customer-landing-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './customer-landing-page/login/login.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { LoginService } from './customer-landing-page/login/login.service';
import { RegistrationComponent } from './customer-landing-page/registration/registration.component';
import { RegistrationService } from './customer-landing-page/registration/registration.service';
import { CustomerCartComponent } from './customer-home/customer-cart/customer-cart.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerHomeService } from './customer-home/customer-home.service';
import { CustomerCartService } from './customer-home/customer-cart/customer-cart.service';
import { ViewAllProductsComponent } from './customer-home/view-all-products/view-all-products.component';
import { CustomerProductDetailsComponent } from './customer-home/view-all-products/customer-product-details/customer-product-details.component';
import { ViewAllProductsService } from './customer-home/view-all-products/view-all-product.service';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { ProductDescriptionPipe } from '../shared/pipes/product-description.pipe';
import { PlaceOrderComponent } from './customer-home/place-order/place-order.component';
import { PlaceOrderService } from './customer-home/place-order/place-order.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ViewOrderComponent } from './customer-home/view-order/view-order.component';
import { CustomerDetailsComponent } from './customer-home/customer-details/customer-details.component';
import { CustomerProfileComponent } from './customer-home/customer-details/customer-profile-details/customer-profile-details.component';


@NgModule({
    declarations: [
        CustomerLandingPageComponent,
        LoginComponent,
        RegistrationComponent,
        CustomerHomeComponent,
        CustomerCartComponent,
        ViewAllProductsComponent,
        CustomerProductDetailsComponent,
        ProductDescriptionPipe,
        PlaceOrderComponent,
        ViewOrderComponent,
        CustomerDetailsComponent,
        CustomerProfileComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxPaginationModule,
        CustomerRoutingModule,
        MatCardModule,
        MatMenuModule,
        MatFormFieldModule
    ],
    providers: [
        LoginService,
        RegistrationService,
        CustomerHomeService,
        CustomerCartService,
        ViewAllProductsService,
        PlaceOrderService
    ],
    exports: [
        CustomerProductDetailsComponent
    ],
   schemas:[
        NO_ERRORS_SCHEMA
    ]

})
export class CustomerModule {

}