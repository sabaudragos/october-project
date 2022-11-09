import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CompanyAddComponent} from './company/company-add/company-add.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {Location} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {CompanyService} from "./service/company-service";
import {ToastrModule} from "ngx-toastr";
import {CompaniesPageComponent} from './company/companies-page/companies-page.component';
import {MatTableModule} from "@angular/material/table";
import {CompanyUpdateComponent} from './company/company-update/company-update.component';
import {ProjectUpdateComponent} from './project/project-update/project-update.component';
import {ProjectAddComponent} from './project/project-add/project-add.component';
import {ProjectsPageComponent} from './project/projects-page/projects-page.component';
import {ProjectService} from "./service/project-service";
import {LOCAL_STORAGE_SERVICE, LocalStorageService} from './service/localstorage-service';
import {LOCAL_STORAGE} from 'ngx-webstorage-service';
import {RemoveConfirmationDialogComponent} from './dialog/remove-confirmation-dialog/remove-confirmation-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from "@angular/material/paginator";
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';
import { UsersPageComponent } from './user/users-page/users-page.component';
import {UserService} from "./service/user-service";
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { SideDrawerComponent } from './side-drawer/side-drawer.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {SideNavService} from "./service/side-nav-service";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [
    AppComponent,
    CompanyAddComponent,
    CompaniesPageComponent,
    CompanyUpdateComponent,
    ProjectUpdateComponent,
    ProjectAddComponent,
    ProjectsPageComponent,
    RemoveConfirmationDialogComponent,
    UserAddComponent,
    UserUpdateComponent,
    UsersPageComponent,
    HeaderComponent,
    SideDrawerComponent,
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
    MatMenuModule,
    MatOptionModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatPaginatorModule,
    ToastrModule.forRoot()
  ],
  providers: [
    CompanyService,
    Location,
    LocalStorageService,
    ProjectService,
    SideNavService,
    UserService,
    {provide: LOCAL_STORAGE_SERVICE, useExisting: LOCAL_STORAGE},],
  bootstrap: [AppComponent]
})
export class AppModule {
}
