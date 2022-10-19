import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyAddComponent } from './company/company-add/company-add.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {Location} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {CompanyService} from "./service/company-service";
import {ToastrModule} from "ngx-toastr";
import { CompaniesPageComponent } from './company/companies-page/companies-page.component';
import {MatTableModule} from "@angular/material/table";
import { CompanyUpdateComponent } from './company/company-update/company-update.component';

@NgModule({
  declarations: [
    AppComponent,
    CompanyAddComponent,
    CompaniesPageComponent,
    CompanyUpdateComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [Location, CompanyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
