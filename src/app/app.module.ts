import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EKartRoutingGuard } from './app.routing-guard';
import { AuthorisationErrorComponent } from './shared/authorisation-error/authorisation-error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerModule } from './customer/coustmer.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import {MatCardModule} from '@angular/material/card';
@NgModule({
  declarations: [
    AppComponent,
    AuthorisationErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    CustomerModule,
    BrowserAnimationsModule,
    CommonModule
    //MatCardModule
    
  ],
  providers: [EKartRoutingGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

